import { sql } from '@vercel/postgres';
import { parse } from 'csv-parse';
import { readFile, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { cleanCurrency } from './utils';
import aws from 'aws-sdk';
import { uploadFile } from './aws/upload';
import { randomUUID } from 'crypto';
import { createCompanyAsNote } from './clinked/notes';
import { createTag, getTagByName } from './tags';
import { createSectors, getSectorByName } from './sectors';
import { createCompany, getCompanyByTicker } from './companies';
import { getLoggedUser } from './users';

export async function uploadFinancialData (req, res) {
    const data       = await req.formData();
    const file       = data.get('file');
    const loggedUser = await getLoggedUser();

    if (!file) {
      return NextResponse.json({ message: 'Please select a file first' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a new filename
    const originalName = file.name;
    const newFileName = `${randomUUID()}-${originalName}`;

    //file upload to s3 bucket
    const uploadResponse = await uploadFile({ buffer, name: newFileName });
    // console.log(`Uploaded file to S3 with response: ${JSON.stringify(uploadResponse)}`);

    // Read and parse the CSV file
    const fileContent = buffer.toString('utf-8');
    const records = [];
    const parser = parse({ delimiter: ',', columns: true });

    parser.on('readable', function() {
      let record;
      while (record = parser.read()) {
        records.push(record);
      }
    });

    parser.on('error', function(err) {
      console.error(err.message);
    });
    // Use a Promise to handle asynchronous operations in 'end' event
    await new Promise((resolve, reject) => {
      parser.on('end', async function() {
        try {
          // Remove all from financial_data table to avoid duplicates
          await sql`DELETE FROM financial_data;`;

          for (const row of records) {
            try {
              const company = row['Company'];
              const year = row['Year'];
              //check financial_data table for company name and year and insert if not present
              const financialDataQuery = `
                SELECT * FROM financial_data
                WHERE company = $1 AND year = $2
              `;
              const financialDataResult = await sql.query(financialDataQuery, [company, year]);
              //get logged in user id
              if (financialDataResult.rows.length > 0) {
                console.log(`Data for ${company} in ${year} already exists`);
              }else{
                await sql`
                INSERT INTO financial_data (
                  year, company, sector, equity_ticker, share_price, div_ticker, p_and_l_fx,
                  div_future_fx, index1, index2, index3, dps_z, current_price_z, discount_premium_percent,
                  annual_return_percent, very_bear_z, bear_z, bull_z, very_bull_z, risk_adj_dps_z, net_income,
                  av_weighted_share_cap, eps, dps_fy, dps_payout_ratio, op_cash_flow, capex, free_cash_flow,
                  dividend, share_buyback, total_capital_return, net_debt, share_in_issue, treasury_shares,
                  shares_outstanding, capital_payout_percent, dps_q1, dps_q2, dps_q3, dps_q4, ex_date_q1,
                  ex_date_q2, ex_date_q3, ex_date_q4, peer_1, peer_2, peer_3, peer_4, updated_by
                ) VALUES (
                  ${row['Year']}, 
                  ${row['Company']}, 
                  ${row['Sector']}, 
                  ${row['Equity Ticker']}, 
                  ${cleanCurrency(row['Share price'])}, 
                  ${row['Div Ticker']}, 
                  ${row['P&L FX']}, 
                  ${row['Div Future FX']},
                  ${row['Index1']}, 
                  ${row['Index2']}, 
                  ${row['Index3']}, 
                  ${cleanCurrency(row['DPS z'])}, 
                  ${cleanCurrency(row['Current Price z'])}, 
                  ${cleanCurrency(row['Discount/ Premium (%)'])},
                  ${cleanCurrency(row['Annual return (%)'])}, 
                  ${cleanCurrency(row['z Very Bear'])}, 
                  ${cleanCurrency(row['z Bear'])}, 
                  ${cleanCurrency(row['z Bull'])}, 
                  ${cleanCurrency(row['z Very Bull'])}, 
                  ${cleanCurrency(row['Risk adj. DPS (z)'])}, 
                  ${cleanCurrency(row['Net Income'])},
                  ${cleanCurrency(row['Av. Weighted Share Cap'])}, 
                  ${cleanCurrency(row['EPS'])}, 
                  ${cleanCurrency(row['DPS (FY)'])}, 
                  ${cleanCurrency(row['DPS payout ratio'])}, 
                  ${cleanCurrency(row['Op Cash Flow'])}, 
                  ${cleanCurrency(row['Capex'])}, 
                  ${cleanCurrency(row['Free Cash Flow'])},
                  ${cleanCurrency(row['Dividend'])}, 
                  ${cleanCurrency(row['Share Buyback'])}, 
                  ${cleanCurrency(row['Total Capital Return'])}, 
                  ${cleanCurrency(row['Net Debt'])}, 
                  ${cleanCurrency(row['Share in issue'])}, 
                  ${cleanCurrency(row['Treasury shares'])},
                  ${cleanCurrency(row['Shares outstanding'])}, 
                  ${cleanCurrency(row['Capital Payout (%)'])}, 
                  ${cleanCurrency(row['DPSQ1'])}, 
                  ${cleanCurrency(row['DPSQ2'])}, 
                  ${cleanCurrency(row['DPSQ3'])}, 
                  ${cleanCurrency(row['DPSQ4'])}, 
                  ${row['Ex Date Q1'] ? `'${row['Ex Date Q1']}'` : null}, 
                  ${row['Ex Date Q2'] ? `'${row['Ex Date Q2']}'` : null}, 
                  ${row['Ex Date Q3'] ? `'${row['Ex Date Q3']}'` : null}, 
                  ${row['Ex Date Q4'] ? `'${row['Ex Date Q4']}'` : null},
                  ${row['Peer1']}, 
                  ${row['Peer2']}, 
                  ${row['Peer3']}, 
                  ${row['Peer4']}, 
                  ${loggedUser.id}
                );`;

                //check sectors table for sector name and insert if not present
              const sector = row['Sector'];
              const sectorResult = await getSectorByName({ name: sector });
              var sectorId = null;
              if (sectorResult.data.length === 0) {
                const  sectorInsertResponse = await createSectors({ name: sector, updated_by: loggedUser.id  }, false);
                sectorId = sectorInsertResponse.data.id;
                console.log('New sector inserted', sectorInsertResponse.data, sectorId);
              }else{
                sectorId = sectorResult.data[0].id
                console.log('Sector already exists', sectorResult.data, sectorId);
              }

              //check companies table for compny name and year and insert if not present, use sector id from sectors table or newly inserted sector
              var tags = `${row['Equity Ticker']}, ${row['Div Ticker']}`;

              //add index1, index2, index3 to tags if not null
              if (row['Index1']) {
                tags += `, ${row['Index1']}`;
              }
              if (row['Index2']) {
                tags += `, ${row['Index2']}`;
              }
              if (row['Index3']) {
                tags += `, ${row['Index3']}`;
              }
              
              const companyResult = await getCompanyByTicker(row['Equity Ticker']);
                console.log('Company result', companyResult.data.rowCount);
              if (companyResult.data.rowCount === 0) {
                const createCompanyResponse = await createCompany({ name: company, equity_ticker: row['Equity Ticker'],  sector_id: sectorId, tags: tags, template: false, member_permission: 1, updated_by: loggedUser.id }, false); 
                console.log('New company inserted', createCompanyResponse);
              }else{
                console.log('Company already exists', companyResult.data);
              }

              //check if Equity Ticker is present in tags table and insert if not present
            const equityTicker = row['Equity Ticker'];
            
            if(equityTicker){
              const equityTickerRes = await getTagByName({ name: equityTicker });
              if(equityTickerRes.data.length === 0){
                let equityTickerTagResponse = await createTag({ name: equityTicker, updated_by: loggedUser.id }, false);
                console.log(equityTickerTagResponse);
              }else{
                console.log(`${equityTicker} already exists`);
              }
            }

            // check if Div Ticker is present in tags table and insert if not present
            const divTicker = row['Div Ticker'];
            if(divTicker){
              const divTickerRes = await getTagByName({ name: divTicker });
              if(divTickerRes.data.length === 0){
                let divTagResponse = await createTag({ name: divTicker, updated_by: loggedUser.id }, false);
                console.log(divTagResponse);
              }else{
                console.log(`${divTicker} already exists`);
              }
            }

            //check if Index1 is present in tags table and insert if not present
            const index1 = row['Index1'];
            if(index1){
              const index1TickerRes = await getTagByName({ name: index1 });
              if(index1TickerRes.data.length === 0){
                let index1TagResponse = await createTag({ name: index1, updated_by: loggedUser.id }, false);
                console.log(index1TagResponse);
              }else{
                console.log(`${index1} already exists`);
              }
            }

            //check if Index2 is present in tags table and insert if not present
            const index2 = row['Index2'];
            if(index2){
              const index2TickerRes = await getTagByName({ name: index2 });
              if(index2TickerRes.data.length === 0){
                let index2TagResponse = await createTag({ name: index2, updated_by: loggedUser.id }, false);
                console.log(index2TagResponse);
              }else{
                console.log(`${index2} already exists`);
              }
            }

            //check if Index3 is present in tags table and insert if not present
            const index3 = row['Index3'];
            if(index3){
              const index3TickerRes = await getTagByName({ name: index3 });
              if(index3TickerRes.data.length === 0){
                let index3TagResponse = await createTag({ name: index3, updated_by: loggedUser.id }, false);
                console.log(index3TagResponse);
              }else{
                console.log(`${index3} already exists`);
              }
            }
            }
            } catch (dbError) {
              console.error('Error inserting data', dbError);
            }
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      parser.write(fileContent);
      parser.end();
    });

    return NextResponse.json({ message: 'File processed and data inserted successfully'});
};

export async function getFinancialDataByCompanyTicker(ticker){
  //fetch financial data for the company, fetch latest 4 only
  const financialDataQuery = `
    SELECT * FROM financial_data
    WHERE equity_ticker = $1
    ORDER BY year DESC
  `;

  const financialDataResult = await sql.query(financialDataQuery, [ticker]);

  return financialDataResult.rows;
}

export async function getFinancialData(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  try {
    const offset = (currentPage - 1) * pageSize;
    const query = `
      SELECT * FROM financial_data
      WHERE company ILIKE $1
      LIMIT $2 OFFSET $3
    `;
    const values = [`%${search}%`, pageSize, offset];
    const result = await sql.query(query, values);

    const totalQuery = `
      SELECT COUNT(*) FROM financial_data
      WHERE company ILIKE $1
    `;
    const totalResult = await sql.query(totalQuery, [`%${search}%`]);
    const totalRecords = parseInt(totalResult.rows[0].count, 10);

    return {
      data: result.rows,
      totalRecords,
      currentPage,
      pageSize,
    };
  } catch (error) {
    console.error('Error fetching financial data:', error);
    return { error: 'Error fetching financial data' };
  }
}

export async function updateFinancialData(req, res){
  // Implement your update logic here
  res.status(200).json({ message: 'Update endpoint not implemented yet' });
};

export async function deleteFinancialData(req, res){
  // Implement your delete logic here
  res.status(200).json({ message: 'Delete endpoint not implemented yet' });
};
