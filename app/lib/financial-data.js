import { sql } from '@vercel/postgres';
import { parse } from 'csv-parse';
import { readFile, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { calculatePercent, cleanDate, cleanField, format2Decimal, roundUpNumber } from './utils';
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
              console.log('Financial data result', financialDataResult.rows);
              //get logged in user id
              if (financialDataResult.rows.length > 0) {

                //the company already exists, update all the data
                console.log(`Data for ${row['Company']} in ${row['Year']} exists, update`);
                const updateAllQuery = `
                UPDATE financial_data
                SET
                  year = $1,
                  company = $2,
                  sector = $3,
                  equity_ticker = $4,
                  share_price = $5,
                  div_ticker = $6,
                  p_and_l_fx = $7,
                  div_future_fx = $8,
                  index1 = $9,
                  index2 = $10,
                  index3 = $11,
                  d1_central = $12,
                  current_price_z = $13,
                  discount_premium_percent = $14,
                  annual_return_percent = $15,
                  d1_lower = $16,
                  d1_upper = $17,
                  risk_distribution = $18,
                  risk_skew = $19,
                  net_income = $20,
                  av_weighted_share_cap = $21,
                  eps = $22,
                  dps_fy = $23,
                  dps_payout_ratio = $24,
                  op_cash_flow = $25,
                  capex = $26,
                  free_cash_flow = $27,
                  dividend = $28,
                  share_buyback = $29,
                  total_capital_return = $30,
                  net_debt = $31,
                  share_in_issue = $32,
                  treasury_shares = $33,
                  shares_outstanding = $34,
                  capital_payout_percent = $35,
                  dps_q1 = $36,
                  dps_q2 = $37,
                  dps_q3 = $38,
                  dps_q4 = $39,
                  ex_date_q1 = $40,
                  ex_date_q2 = $41,
                  ex_date_q3 = $42,
                  ex_date_q4 = $43,
                  peer_1 = $44,
                  peer_2 = $45,
                  peer_3 = $46,
                  peer_4 = $47,
                  updated_at = NOW(),
                  updated_by = $48
                WHERE
                  equity_ticker = $49 AND
                  year = $50;
              `;

                //if row['DPS z] and row['Current Price z'] is not empty set discountPremiumPercent to (row['Current Price z'] / row['DPS z']) - 1
                var discountPremiumPercent = null;
                if(row['DPS z'] && row['Current Price z']){
                  discountPremiumPercent = calculatePercent(format2Decimal(row['Current Price z']), format2Decimal(row['DPS z']));
                  console.log('Discount premium percent is', discountPremiumPercent, row['Equity Ticker'], row['Year']);
                }else{
                  discountPremiumPercent = '-';
                  console.log('Discount premium percent is n/a for', row['Equity Ticker'], row['Year']);
                }
              
              const values = [
                cleanField(row['Year']),
                cleanField(row['Company']),
                cleanField(row['Sector']),
                cleanField(row['Equity Ticker']),
                format2Decimal(row['Share price']),
                cleanField(row['Div Ticker']),
                cleanField(row['P&L FX']),
                cleanField(row['Div Future FX']),
                cleanField(row['Index1']),
                cleanField(row['Index2']),
                cleanField(row['Index3']),
                format2Decimal(row['D1 Central']),
                format2Decimal(row['Current Price z']),
                cleanField(discountPremiumPercent),
                cleanField(row['Annual return (%)']),
                format2Decimal(row['D1 Lower']),
                format2Decimal(row['D1 Upper']),
                format2Decimal(row['Risk distribution']),
                cleanField(row['Risk skew']),
                roundUpNumber(row['Net Income']),
                roundUpNumber(row['Av. Weighted Share Cap']),
                format2Decimal(row['EPS']),
                format2Decimal(row['DPS (FY)']),
                cleanField(row['DPS payout ratio']),
                roundUpNumber(row['Op Cash Flow']),
                roundUpNumber(row['Capex']),
                roundUpNumber(row['Free Cash Flow']),
                roundUpNumber(row['Dividend']),
                roundUpNumber(row['Share Buyback']),
                roundUpNumber(row['Total Capital Return']),
                roundUpNumber(row['Net Debt']),
                roundUpNumber(row['Share in issue']),
                roundUpNumber(row['Treasury shares ']),
                cleanField(row['Shares outstanding']),
                cleanField(row['Capital Payout (%)']),
                format2Decimal(row['DPSQ1']),
                format2Decimal(row['DPSQ2']),
                format2Decimal(row['DPSQ3']),
                format2Decimal(row['DPSQ4']),
                cleanDate(row['Ex Date Q1']),
                cleanDate(row['Ex Date Q2']),
                cleanDate(row['Ex Date Q3']),
                cleanDate(row['Ex Date Q4']),
                cleanField(row['Peer1']),
                cleanField(row['Peer2']),
                cleanField(row['Peer3']),
                cleanField(row['Peer4']),
                cleanField(loggedUser.id),
                cleanField(row['Equity Ticker']),
                cleanField(row['Year'])
              ];

                try {
                  const result = await sql.query(updateAllQuery, values);
                  console.log('Update successful:', result);
                } catch (err) {
                  console.error('Error executing query:', err.stack);
                }

                //if any of this changed, update the historical data
                if((Number(financialDataResult.rows[0]['d1_central']) !== format2Decimal(row['D1 Central']) && row['D1 Central']) || 
                  (Number(financialDataResult.rows[0]['d1_lower']) !== format2Decimal(row['D1 Lower']) && row['D1 Lower']) || 
                  (Number(financialDataResult.rows[0]['d1_upper']) !== format2Decimal(row['D1 Upper']) && row['D1 Upper']) || 
                  (Number(financialDataResult.rows[0]['risk_distribution']) !== format2Decimal(row['Risk distribution']) && row['Risk distribution'])){

                  console.log('Some estimates changed, update historical data');

                  try {
                    const insertQuery = `INSERT INTO financial_data_history (
                     year, 
                     company, 
                     equity_ticker, 
                     d1_central, 
                     d1_lower, 
                     d1_upper, 
                     risk_distribution, 
                     updated_by) VALUES (
                     $1, 
                     $2, 
                     $3, 
                     $4, 
                     $5, 
                     $6, 
                     $7, 
                     $8);`;
 
                   await sql.query(insertQuery, [
                     financialDataResult.rows[0]['year'], 
                     financialDataResult.rows[0]['company'], 
                     financialDataResult.rows[0]['equity_ticker'], 
                     format2Decimal(financialDataResult.rows[0]['d1_central']), 
                     format2Decimal(financialDataResult.rows[0]['d1_lower']),
                     format2Decimal(financialDataResult.rows[0]['d1_upper']),
                     format2Decimal(financialDataResult.rows[0]['risk_distribution']),
                     loggedUser.id]
                   );
                  } catch (error) {
                    throw new Error('Error inserting historical data');
                  }

                }else{
                  console.log("Nothing to save in historical data!");
                }
                
              }else{
                if(row['Year'] && row['Company'] && row['Equity Ticker']){

                  console.log(`Data for ${row['Company']} in ${row['Year']} does not exist, inserting...`);

                  //if row['DPS z] and row['Current Price z'] is not empty set discountPremiumPercent to (row['Current Price z'] / row['DPS z']) - 1
                  var discountPremiumPercent = null;
                  if(row['DPS z'] && row['Current Price z']){
                    discountPremiumPercent = (format2Decimal(row['Current Price z']) / format2Decimal(row['DPS z'])) - 1;
                    console.log('Discount premium percent is', discountPremiumPercent, row['Equity Ticker'], row['Year']);
                  }else{
                    discountPremiumPercent = '-';
                    console.log('Discount premium percent is n/a for', row['Equity Ticker'], row['Year']);
                  }

                  await sql`
                  INSERT INTO financial_data (
                    year, company, sector, equity_ticker, share_price, div_ticker, p_and_l_fx,
                    div_future_fx, index1, index2, index3, d1_central, current_price_z, discount_premium_percent,
                    annual_return_percent, d1_lower, d1_upper, risk_distribution, risk_skew, net_income,
                    av_weighted_share_cap, eps, dps_fy, dps_payout_ratio, op_cash_flow, capex, free_cash_flow,
                    dividend, share_buyback, total_capital_return, net_debt, share_in_issue, treasury_shares,
                    shares_outstanding, capital_payout_percent, dps_q1, dps_q2, dps_q3, dps_q4, ex_date_q1,
                    ex_date_q2, ex_date_q3, ex_date_q4, peer_1, peer_2, peer_3, peer_4, updated_by
                  ) VALUES (
                    ${row['Year']}, 
                    ${row['Company']}, 
                    ${row['Sector']}, 
                    ${row['Equity Ticker']}, 
                    ${format2Decimal(row['Share price'])}, 
                    ${cleanField(row['Div Ticker'])}, 
                    ${cleanField(row['P&L FX'])}, 
                    ${cleanField(row['Div Future FX'])},
                    ${cleanField(row['Index1'])}, 
                    ${cleanField(row['Index2'])}, 
                    ${cleanField(row['Index3'])}, 
                    ${format2Decimal(row['D1 Central'])}, 
                    ${format2Decimal(row['Current Price z'])}, 
                    ${cleanField(discountPremiumPercent)},
                    ${cleanField(row['Annual return (%)'])}, 
                    ${roundUpNumber(row['D1 Lower'])}, 
                    ${roundUpNumber(row['D1 Upper'])}, 
                    ${roundUpNumber(row['Risk distribution'])}, 
                    ${cleanField(row['Risk skew'])}, 
                    ${cleanField(row['Net Income'])},
                    ${cleanField(row['Av. Weighted Share Cap'])}, 
                    ${cleanField(row['EPS'])}, 
                    ${cleanField(row['DPS (FY)'])}, 
                    ${cleanField(row['DPS payout ratio'])}, 
                    ${roundUpNumber(row['Op Cash Flow'])}, 
                    ${roundUpNumber(row['Capex'])}, 
                    ${roundUpNumber(row['Free Cash Flow'])},
                    ${roundUpNumber(row['Dividend'])}, 
                    ${roundUpNumber(row['Share Buyback'])}, 
                    ${roundUpNumber(row['Total Capital Return'])}, 
                    ${roundUpNumber(row['Net Debt'])}, 
                    ${roundUpNumber(row['Share in issue'])}, 
                    ${roundUpNumber(row['Treasury shares'])},
                    ${cleanField(row['Shares outstanding'])}, 
                    ${cleanField(row['Capital Payout (%)'])}, 
                    ${format2Decimal(row['DPSQ1'])}, 
                    ${format2Decimal(row['DPSQ2'])}, 
                    ${format2Decimal(row['DPSQ3'])}, 
                    ${format2Decimal(row['DPSQ4'])}, 
                    ${cleanDate(row['Ex Date Q1'])}, 
                    ${cleanDate(row['Ex Date Q2'])}, 
                    ${cleanDate(row['Ex Date Q3'])}, 
                    ${cleanDate(row['Ex Date Q4'])},
                    ${cleanField(row['Peer1'])}, 
                    ${cleanField(row['Peer2'])}, 
                    ${cleanField(row['Peer3'])}, 
                    ${cleanField(row['Peer4'])}, 
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
                try {
                  const createCompanyResponse = await createCompany({ name: row['Company'], equity_ticker: row['Equity Ticker'],  sector_id: sectorId, tags: tags, template: false, member_permission: 1, updated_by: loggedUser.id }, false); 
                  console.log('New company inserted', row['Company']);
                } catch (error) {
                  console.error('Error inserting company', error);
                }
              }else{
                console.log(`Company ${row['Equity Ticker']} already exists`);
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
            const divTicker = cleanField(row['Div Ticker']);
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
            const index1 = cleanField(row['Index1']);
            if(index1 && index1 !== 0 && index1 !== '0'){
              const index1TickerRes = await getTagByName({ name: index1 });
              if(index1TickerRes.data.length === 0){
                let index1TagResponse = await createTag({ name: index1, updated_by: loggedUser.id }, false);
                console.log(index1TagResponse);
              }else{
                console.log(`${index1} already exists`);
              }
            }

            //check if Index2 is present in tags table and insert if not present
            const index2 = cleanField(row['Index2']);
            if(index2 && index2 !== 0 && index2 !== '0'){
              const index2TickerRes = await getTagByName({ name: index2 });
              if(index2TickerRes.data.length === 0){
                let index2TagResponse = await createTag({ name: index2, updated_by: loggedUser.id }, false);
                console.log(index2TagResponse);
              }else{
                console.log(`${index2} already exists`);
              }
            }

            //check if Index3 is present in tags table and insert if not present
            const index3 = cleanField(row['Index3']);
            if(index3 && index3 !== 0 && index1 !== '0'){
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
                const updateQuery = `UPDATE financial_data SET current_price_z = $1, share_price = $2, updated_by = $3, update_at = NOW() WHERE equity_ticker = $4 AND year = $5`;
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
      ORDER BY company, year ASC
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
