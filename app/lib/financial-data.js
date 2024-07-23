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
          // await sql`DELETE FROM financial_data;`;

          for (const row of records) {
            try {

              //check financial_data table for company name and year and insert if not present
              const financialDataQuery = `
                SELECT * FROM financial_data
                WHERE company = $1 AND year = $2 AND equity_ticker = $3
              `;
              const financialDataResult = await sql.query(financialDataQuery, [row['Company'], row['Year'], row['Equity Ticker']]);
              
              //get logged in user id
              if (financialDataResult.rows.length > 0) {
                  console.log(`Data for ${row['Company']} in ${row['Year']} already exists`);
                  //if the company already exists, update the data
                  // await sql`UPDATE financial_data SET`

                if((Number(financialDataResult.rows[0]['dps_z']) !== cleanCurrency(row['DPS z']) && row['DPS z']) || 
                  (Number(financialDataResult.rows[0]['very_bear_z']) !== cleanCurrency(row['z Very Bear'] && row['z Very Bear'])) || 
                  (Number(financialDataResult.rows[0]['bear_z']) !== cleanCurrency(row['z Bear']) && row['z Bear']) || 
                  (Number(financialDataResult.rows[0]['bull_z']) !== cleanCurrency(row['z Bull']) && row['z Bull']) || 
                  (Number(financialDataResult.rows[0]['very_bull_z']) !== cleanCurrency(row['z Very Bull']) && row['z Very Bull']) || 
                  (Number(financialDataResult.rows[0]['risk_adj_dps_z']) !== cleanCurrency(row['Risk adj. DPS (z)']) && row['Risk adj. DPS (z)'])){

                  var dpsZQuery = '';
                  var veryBearZQuery = '';
                  var bearZQuery = '';
                  var bullZQuery = '';
                  var veryBullZQuery = '';
                  var riskAdjDpsZQuery = '';
                  let needUpdate = false;
                  
                  if(row['DPS z'] && (Number(financialDataResult.rows[0]['dps_z']) !== Number(row['DPS z']))){
                    dpsZQuery = `dps_z = ${cleanCurrency(row['DPS z'])},`;
                    console.log('DPS Z query', dpsZQuery);

                    needUpdate = true;
                  }

                  if(row['z Very Bear'] && (Number(financialDataResult.rows[0]['very_bear_z']) !== Number(row['z Very Bear']))){
                    veryBearZQuery = `very_bear_z = ${cleanCurrency(row['z Very Bear'])},`;
                    console.log('Very Bear Z query', veryBearZQuery);

                    needUpdate = true;
                  }

                  if(row['z Bear'] && (Number(financialDataResult.rows[0]['bear_z']) !== Number(row['z Bear']))){
                    bearZQuery = `bear_z = ${cleanCurrency(row['z Bear'])},`;
                    console.log('Bear Z query', bearZQuery);

                    needUpdate = true;
                  }

                  if(row['z Bull'] && (Number(financialDataResult.rows[0]['bull_z']) !== Number(row['z Bull']))){
                    bullZQuery = `bull_z = ${cleanCurrency(row['z Bull'])},`;
                    console.log('Bull Z query', bullZQuery);

                    needUpdate = true;
                  }

                  if(row['z Very Bull'] && (Number(financialDataResult.rows[0]['very_bull_z']) !== Number(row['z Very Bull']))){
                    veryBullZQuery = `very_bull_z = ${cleanCurrency(row['z Very Bull'])},`;
                    console.log('Very Bull Z query', veryBullZQuery);

                    needUpdate = true;
                  }

                  if(row['Risk adj. DPS (z)'] && (Number(financialDataResult.rows[0]['risk_adj_dps_z']) !== Number(row['Risk adj. DPS (z)']))){
                    riskAdjDpsZQuery = `risk_adj_dps_z = ${cleanCurrency(row['Risk adj. DPS (z)'])},`;
                    console.log('Risk Adj DPS Z query', riskAdjDpsZQuery);

                    needUpdate = true;
                  }

                  if(needUpdate){
                  const updateQuery = `UPDATE financial_data SET ${dpsZQuery} ${veryBearZQuery} ${bearZQuery} ${veryBullZQuery} ${riskAdjDpsZQuery} updated_by = $1 WHERE equity_ticker = $2 AND year = $3`;

                  const updateResponse = await sql.query(updateQuery, [loggedUser.id, row['Equity Ticker'], row['Year']]);

                  console.log('update response:', updateResponse);

                   const insertQuery = `INSERT INTO financial_data_history (
                    year, 
                    company, 
                    equity_ticker, 
                    dps_z, 
                    very_bear_z, 
                    bear_z, 
                    bull_z, 
                    very_bull_z, 
                    risk_adj_dps_z, 
                    updated_by) VALUES (
                    $1, 
                    $2, 
                    $3, 
                    $4, 
                    $5, 
                    $6, 
                    $7, 
                    $8, 
                    $9, 
                    $10);`;

                  await sql.query(insertQuery, [
                    financialDataResult.rows[0]['year'], 
                    financialDataResult.rows[0]['company'], 
                    financialDataResult.rows[0]['equity_ticker'], 
                    cleanCurrency(financialDataResult.rows[0]['dps_z']), 
                    cleanCurrency(financialDataResult.rows[0]['very_bear_z']),
                    cleanCurrency(financialDataResult.rows[0]['bear_z']),
                    cleanCurrency(financialDataResult.rows[0]['bull_z']),
                    cleanCurrency(financialDataResult.rows[0]['very_bull_z']),
                    cleanCurrency(financialDataResult.rows[0]['risk_adj_dps_z']),
                    loggedUser.id]
                  );
                }else{
                  console.log("Nothing to update");
                }

                }else{
                  console.log("Share price and current price z are the same, no need to update");
                }
                
              }else{

                if(row['Year'] && row['Company'] && row['Equity Ticker']){
                

                console.log(`Data for ${row['Company']} in ${row['Year']} does not exist, inserting`);

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
            }else{
              console.log('Year, Company or Equity Ticker is missing, ignore since this might be a price file');
            
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



export async function uploadPriceFileData (req, res) {
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
        // await sql`DELETE FROM financial_data;`;

        for (const row of records) {
          try {

            if(row['Year'] && row['Equity Ticker']){
              //check financial_data table for company name and year and insert if not present
              const financialDataQuery = `SELECT id FROM financial_data WHERE year = $1 AND equity_ticker = $2`;
              const financialDataResult = await sql.query(financialDataQuery, [row['Year'], row['Equity Ticker']]);

              const newCurrentPrice = isNaN(row['Dividend futures price'])  ? 'n/a' : row['Dividend futures price'];
              const newSharePrice = isNaN(row['Equity share price']) ? 'n/a' : row['Equity share price'];

              if (financialDataResult.rows.length > 0) {
                console.log(`Data for ${row['Equity Ticker']} in ${row['Year']} exists, update share price to ${newSharePrice} and current price z to ${newCurrentPrice}`);
                //if the company already exists, update the data
                const updateQuery = `UPDATE financial_data SET current_price_z = $1, share_price = $2, updated_by = $3 WHERE equity_ticker = $4 AND year = $5`;
                const updateResponse = await sql.query(updateQuery, [newCurrentPrice, newSharePrice, loggedUser.id, row['Equity Ticker'], row['Year']]);

                console.log('Company updated', row['Equity Ticker'], row['Year']);
              }else{
                console.log(`Data for ${row['Equity Ticker']} in ${row['Year']} does not exist, ignore!`);
              }
            }else{
              console.log('Year or Equity Ticker is missing, ignore');
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

export async function getFinancialDataByCompanyTicker(ticker, fields = '*') {
  //fetch financial data for the company, fetch latest 5 only
  const financialDataQuery = `
    SELECT ${fields} FROM financial_data
    WHERE equity_ticker = $1
    ORDER BY year DESC LIMIT 5
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
      WHERE company ILIKE $1 OR equity_ticker ILIKE $1
      ORDER BY company ASC
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
