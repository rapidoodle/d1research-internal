import { sql } from '@vercel/postgres';
import { parse } from 'csv-parse';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getLoggedUser } from './users';
import { uploadFile } from './aws/upload';
import { sensitivitiesMapping } from './table-columns/columns';


function combineHeaders(row1, row2) {
  return row1.map((header, index) => row2[index] ? row2[index] : header);
}

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
  const parser = parse({ delimiter: ',', from_line: 1 });

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
        const combinedHeaders = combineHeaders(records[0], records[1]);

        for (const row of records) {
          
            try {
              const rowData = Object.fromEntries(combinedHeaders.map((header, index) => [header, row[index]]));

              if (rowData['Year'] && rowData['Equity Ticker'] && rowData['Year'] !== 'Year' && rowData['Equity Ticker'] !== 'Equity Ticker') {
                // Check if the record exists
                const query = `SELECT id FROM sensitivities WHERE year = $1 AND equity_ticker = $2`;
                const result = await sql.query(query, [rowData['Year'], rowData['Equity Ticker']]);

                const values = [
                  rowData['Year'],
                  rowData['Company'],
                  rowData['Equity Ticker'],
                  rowData['V Bear'],
                  rowData['Bear'],
                  rowData['Central'],
                  rowData['Bull'],
                  rowData['V Bull'],
                  rowData['Risk adj.'],
                  rowData['Discount to Central (%)'],
                  rowData['Payout % Very Bear'],
                  rowData['Payout % Bear'],
                  rowData['Payout % Central'],
                  rowData['Payout % Bull'],
                  rowData['Payout % Very Bull'],
                  rowData['Vbe - Sales (m) VBe'],
                  rowData['Vbe - Sales v Central % VBe'],
                  rowData['Vbe - Net income (m)'],
                  rowData['Vbe - NI margin (%)'],
                  rowData['Vbe - NI margin change (bp)'],
                  rowData['Vbe - AWSC (m)'],
                  rowData['Vbe - EPS'],
                  rowData['Vbe - EPS v Central %'],
                  rowData['DPS VBe1'],
                  rowData['DPS VBe2'],
                  rowData['DPS VBe3'],
                  rowData['DPS VBe4'],
                  rowData['DPS VBe5'],
                  rowData['Be - Sales (m) Be'],
                  rowData['Be - Sales v Central % Be'],
                  rowData['Be - Net income (m)'],
                  rowData['Be - NI margin (%)'],
                  rowData['Be - NI margin change (bp)'],
                  rowData['Be - AWSC (m)'],
                  rowData['Be - EPS'],
                  rowData['Be - EPS v Central %'],
                  rowData['DPS Be1'],
                  rowData['DPS Be2'],
                  rowData['DPS Be3'],
                  rowData['DPS Be4'],
                  rowData['DPS Be5'],
                  rowData['Ce - Sales (m) Ce'],
                  rowData['Ce - Sales v Central %'],
                  rowData['Ce - Net income (m)'],
                  rowData['Ce - NI margin (%)'],
                  rowData['Ce - NI margin change (bp)'],
                  rowData['Ce - AWSC (m)'],
                  rowData['Ce - EPS'],
                  rowData['Ce - EPS v Central %'],
                  rowData['DPS Ce1'],
                  rowData['DPS Ce2'],
                  rowData['DPS Ce3'],
                  rowData['DPS Ce4'],
                  rowData['DPS Ce5'],
                  rowData['Bu - Sales (m) Bu'],
                  rowData['Bu - Sales v Central %'],
                  rowData['Bu - Net income (m)'],
                  rowData['Bu - NI margin (%)'],
                  rowData['Bu - NI margin change (bp)'],
                  rowData['Bu - AWSC (m)'],
                  rowData['Bu - EPS'],
                  rowData['Bu - EPS v Buntral %'],
                  rowData['DPS Bu1'],
                  rowData['DPS Bu2'],
                  rowData['DPS Bu3'],
                  rowData['DPS Bu4'],
                  rowData['DPS Bu5'],
                  rowData['VBu - Sales (m) VBu'],
                  rowData['VBu - Sales v Central %'],
                  rowData['VBu - Net income (m)'],
                  rowData['VBu - NI margin (%)'],
                  rowData['VBu - NI margin change (bp)'],
                  rowData['VBu - AWSC (m)'],
                  rowData['VBu - EPS'],
                  rowData['VBu - EPS v Central %'],
                  rowData['DPS VBu1'],
                  rowData['DPS VBu2'],
                  rowData['DPS VBu3'],
                  rowData['DPS VBu4'],
                  rowData['DPS VBu5'],
                  rowData['Payout % Very Bear'],
                  rowData['Payout % Bear'],
                  rowData['Payout % Central'],
                  rowData['Payout % Bull'],
                  rowData['Payout % Very Bull'],
                  rowData['Vbe - Sales (m) VBe'],
                  rowData['Vbe - Sales v Central % VBe'],
                  rowData['Vbe - Net income (m)'],
                  rowData['Vbe - NI margin (%)'],
                  rowData['Vbe - NI margin change (bp)'],
                  rowData['Vbe - AWSC (m)'],
                  rowData['Vbe - EPS'],
                  rowData['Vbe - EPS v Central %'],
                  rowData['Sales25'],
                  rowData['SvC25'],
                  rowData['NI25'],
                  rowData['NIM25'],
                  rowData['NIMc25'],
                  rowData['AWSC25'],
                  rowData['EPS25'],
                  rowData['EPSvC25'],
                  rowData['Pay25VBe'],
                  rowData['Pay25Be'],
                  rowData['Pay25C'],
                  rowData['Pay25Bu'],
                  rowData['Pay25VBu'],
                  rowData['Sales26'],
                  rowData['SvC26'],
                  rowData['NI26'],
                  rowData['NIM26'],
                  rowData['NIMc26'],
                  rowData['AWSC26'],
                  rowData['EPS26'],
                  rowData['EPSvC26'],
                  rowData['Pay26VBe'],
                  rowData['Pay26Be'],
                  rowData['Pay26C'],
                  rowData['Pay26Bu'],
                  rowData['Pay26VBu'],
                  rowData['Vbe Q1'],
                  rowData['Be Q1'],
                  rowData['Bu Q1'],
                  rowData['VBu Q1'],
                  rowData['Vbe Q2'],
                  rowData['Be Q2'],
                  rowData['Bu Q2'],
                  rowData['VBu Q2'],
                  rowData['Vbe Q3'],
                  rowData['Be Q3'],
                  rowData['Bu Q3'],
                  rowData['VBu Q3'],
                  rowData['Vbe Q4'],
                  rowData['Be Q4'],
                  rowData['Bu Q4'],
                  rowData['VBu Q4'],
                  rowData['Vbe Total'],
                  rowData['Be Total'],
                  rowData['Bu Total'],
                  rowData['VBu Total'],
                  rowData['2024Bu'],
                  rowData['2025Bu'],
                  rowData['2026Bu'],
                  rowData['2027Bu'],
                  rowData['2020VBu'],
                  rowData['2021VBu'],
                  rowData['2022VBu'],
                  rowData['2023VBu'],
                  rowData['2024VBu'],
                  rowData['2025VBu'],
                  rowData['2026VBu'],
                  rowData['2027VBu'],
                  rowData['Vbe Q1'],
                  rowData['Be Q1'],
                  rowData['Bu Q1'],
                  rowData['VBu Q1'],
                  rowData['Vbe Q2'],
                  rowData['Be Q2'],
                  rowData['Bu Q2'],
                  rowData['VBu Q2'],
                  rowData['Vbe Q3'],
                  rowData['Be Q3'],
                  rowData['Bu Q3'],
                  rowData['VBu Q3'],
                  rowData['Vbe Q4'],
                  rowData['Be Q4'],
                  rowData['Bu Q4'],
                  rowData['VBu Q4'],
                  rowData['Vbe Total'],
                  rowData['Be Total'],
                  rowData['Bu Total'],
                  rowData['VBu Total']
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