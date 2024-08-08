import { sql } from '@vercel/postgres';
import { parse } from 'csv-parse';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getLoggedUser } from './users';
import { uploadFile } from './aws/upload';
import { sensitivitiesMapping } from './table-columns/columns';


export async function uploadSensitivitiesData(req, res) {
  const data = await req.formData();
  const file = data.get('file');
  const loggedUser = await getLoggedUser();

  if (!file) {
    return NextResponse.json({ message: 'Please select a file first' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate a new filename
  const originalName = file.name;
  const newFileName = `${randomUUID()}-${originalName}`;

  // File upload to S3 bucket
  const uploadResponse = await uploadFile({ buffer, name: newFileName });

  // Read and parse the CSV file
  const fileContent = buffer.toString('utf-8');
  const records = [];
  const parser = parse({ delimiter: ',', from_line: 5 });

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
        // const headers = records.shift();  // Remove the header row
        const headers = records[0];

        for (const row of records) {
          
            try {
              const rowData = Object.fromEntries(headers.map((header, index) => [header, row[index]]));

              if (rowData['Year'] && rowData['Equity Ticker'] && rowData['Year'] !== 'Year' && rowData['Equity Ticker'] !== 'Equity Ticker') {
                // Check if the record exists
                const query = `SELECT id FROM sensitivities WHERE year = $1 AND equity_ticker = $2`;
                const result = await sql.query(query, [rowData['Year'], rowData['Equity Ticker']]);

                const values = [
                  rowData['Year'],
                  rowData['Company'],
                  rowData['Equity Ticker'],
                  rowData['Lower Sales (m)'],
                  rowData['Lower Sales v Central %'],
                  rowData['Lower Net income (m)'],
                  rowData['Lower NI margin (%)'],
                  rowData['Lower NI margin change (bp)'],
                  rowData['Lower AWSC (m)'],
                  rowData['Lower EPS'],
                  rowData['Lower EPS v Central %'],
                  rowData['Lower DPS '],
                  rowData['Lower Payout Ratio'],
                  rowData['Central Sales (m)'],
                  rowData['Central Sales v Central %'],
                  rowData['Central Net income (m)'],
                  rowData['Central NI margin (%)'],
                  rowData['Central NI margin change (bp)'],
                  rowData['Central AWSC (m)'],
                  rowData['Central EPS'],
                  rowData['Central EPS v Central %'],
                  rowData['Central DPS '],
                  rowData['Central Payout Ratio'],
                  rowData['Upper Sales (m)'],
                  rowData['Upper Sales v Central %'],
                  rowData['Upper Net income (m)'],
                  rowData['Upper NI margin (%)'],
                  rowData['Upper NI margin change (bp)'],
                  rowData['Upper AWSC (m)'],
                  rowData['Upper EPS'],
                  rowData['Upper EPS v Central %'],
                  rowData['Upper DPS '],
                  rowData['Upper Payout Ratio'],
                  rowData['Lo Q1 Div'],
                  rowData['Lo Q2 Div'],
                  rowData['Lo Q3 Div'],
                  rowData['Lo Q4 Div'],
                  rowData['Lo Total'],
                  rowData['Ce Q1 Div'],
                  rowData['Ce Q2 Div'],
                  rowData['Ce Q3 Div'],
                  rowData['Ce Q4 Div'],
                  rowData['Ce Total'],
                  rowData['Up Q1 Div'],
                  rowData['Up Q2 Div'],
                  rowData['Up Q3 Div'],
                  rowData['Up Q4 Div'],
                  rowData['Up Total']
                ];

                const columns = Object.keys(sensitivitiesMapping).map(key => sensitivitiesMapping[key]);

                if (result.rows.length > 0) {
                  console.log('Record exists', rowData['Equity Ticker'], rowData['Year'],' updating...');
                  // If the record exists, update it
                  const updateQuery = `
                    UPDATE sensitivities
                    SET ${columns.map((col, idx) => `"${col}" = $${idx + 1}`).join(', ')}, updated_by = $${columns.length + 1}
                    WHERE equity_ticker = $${columns.length + 2} AND year = $${columns.length + 3}`;
                  await sql.query(updateQuery, [...values, loggedUser.id, rowData['Equity Ticker'], rowData['Year']]);
                  console.log('Record updated', rowData['Equity Ticker'], rowData['Year'], values);
                } else {
                  console.log('Record does not exist', rowData['Equity Ticker'], rowData['Year'], ' inserting...');
                  // If the record does not exist, insert a new record
                  const insertQuery = `
                    INSERT INTO sensitivities (${columns.map(col => `"${col}"`).join(', ')}, updated_by)
                    VALUES (${columns.map((_, idx) => `$${idx + 1}`).join(', ')}, $${columns.length + 1})`;

                  await sql.query(insertQuery, [...values, loggedUser.id]);
                  console.log('Record inserted', rowData['Equity Ticker'], rowData['Year'], values);
                }
              } else {
                console.log('Year or Equity Ticker is missing, ignore');
              }

            } catch (dbError) {
              console.error('Error processing data', dbError);
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

  return NextResponse.json({ message: 'File processed and data inserted/updated successfully' });
}


export async function getSensitivitiesData(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  
    try {
      const offset = (currentPage - 1) * pageSize;
      const query = `
        SELECT * FROM sensitivities
        WHERE company ILIKE $1 OR equity_ticker ILIKE $1
        ORDER BY company, year ASC
        LIMIT $2 OFFSET $3
      `;
      const values = [`%${search}%`, pageSize, offset];
      const result = await sql.query(query, values);
  
      const totalQuery = `
        SELECT COUNT(*) FROM sensitivities
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
      console.error('Error fetching sensitivities data:', error);
      return { error: 'Error fetching sensitivities data' };
    }
}


export async function getSensitivitiesDataByCompanyTicker(ticker, fields = '*') {

  const sensDataQuery = `
    SELECT ${fields} FROM sensitivities
    WHERE equity_ticker = $1
    ORDER BY year DESC
  `;

  const sensDataResult = await sql.query(sensDataQuery, [ticker]);

  return sensDataResult.rows;
}