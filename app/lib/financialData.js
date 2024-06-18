import { sql } from '@vercel/postgres';
import { parse } from 'csv-parse';
import { formidable } from 'formidable';
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

const uploadFinancialData = async (req, res) => {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ message: 'Please select a file first' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file to the public/uploads directory
    const publicPath = join(process.cwd(), 'public', 'files', file.name);
    await writeFile(publicPath, buffer);
    console.log(`Uploaded file to ${publicPath}`);

    // Read and parse the CSV file
    const fileContent = await readFile(publicPath, 'utf-8');
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

    parser.on('end', async function() {
      // Insert parsed data into the financial_data table
      for (const row of records) {
        try {
          await sql`
          INSERT INTO financial_data (
            year, company, sector, equity_ticker, share_price, div_ticker, p_and_l_fx,
            div_future_fx, index1, index2, index3, dps_z, current_price_z, discount_premium_percent,
            annual_return_percent, very_bear_z, bear_z, bull_z, very_bull_z, risk_adj_dps_z, net_income,
            av_weighted_share_cap, eps, dps_fy, dps_payout_ratio, op_cash_flow, capex, free_cash_flow,
            dividend, share_buyback, total_capital_return, net_debt, share_in_issue, treasury_shares,
            shares_outstanding, capital_payout_percent, dps_q1, dps_q2, dps_q3, dps_q4, ex_date_q1,
            ex_date_q2, ex_date_q3, ex_date_q4
            ) VALUES (
              ${parseInt(row['Year']) || null}, 
              ${row['Company']}, 
              ${row['Sector']}, 
              ${row['Equity Ticker']}, 
              ${parseFloat(row['Share price']) || null}, 
              ${row['Div Ticker']}, 
              ${row['P&L FX']}, 
              ${row['Div Future FX']},
              ${row['Index1']}, 
              ${row['Index2']}, 
              ${row['Index3']}, 
              ${parseFloat(row['DPS z']) || null}, 
              ${parseFloat(row['Current Price z']) || null}, 
              ${parseFloat(row['Discount/ Premium (%)']) || null},
              ${parseFloat(row['Annual return (%)']) || null}, 
              ${parseFloat(row['z Very Bear']) || null}, 
              ${parseFloat(row['z Bear']) || null}, 
              ${parseFloat(row['z Bull']) || null}, 
              ${parseFloat(row['z Very Bull']) || null}, 
              ${parseFloat(row['Risk adj. DPS (z)']) || null}, 
              ${parseFloat(row['Net Income']) || null},
              ${parseFloat(row['Av. Weighted Share Cap']) || null}, 
              ${parseFloat(row['EPS']) || null}, 
              ${parseFloat(row['DPS (FY)']) || null}, 
              ${parseFloat(row['DPS payout ratio']) || null}, 
              ${parseFloat(row['Op Cash Flow']) || null}, 
              ${parseFloat(row['Capex']) || null}, 
              ${parseFloat(row['Free Cash Flow']) || null},
              ${parseFloat(row['Dividend']) || null}, 
              ${parseFloat(row['Share Buyback']) || null}, 
              ${parseFloat(row['Total Capital Return']) || null}, 
              ${parseFloat(row['Net Debt']) || null}, 
              ${parseFloat(row['Share in issue']) || null}, 
              ${parseFloat(row['Treasury shares']) || null},
              ${parseFloat(row['Shares outstanding']) || null}, 
              ${parseFloat(row['Capital Payout (%)']) || null}, 
              ${parseFloat(row['DPSQ1']) || null}, 
              ${parseFloat(row['DPSQ2']) || null}, 
              ${parseFloat(row['DPSQ3']) || null}, 
              ${parseFloat(row['DPSQ4']) || null}, 
              ${row['Ex Date Q1'] ? `'${row['Ex Date Q1']}'` : null}, 
              ${row['Ex Date Q2'] ? `'${row['Ex Date Q2']}'` : null}, 
              ${row['Ex Date Q3'] ? `'${row['Ex Date Q3']}'` : null}, 
              ${row['Ex Date Q4'] ? `'${row['Ex Date Q4']}'` : null}
          );
        `;
        } catch (dbError) {
          console.error('Error inserting data', dbError);
        }
      }
    });

    parser.write(fileContent);
    parser.end();

    return NextResponse.json({ message: 'File processed and data inserted successfully' });
};

const getFinancialData = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM financial_data`;
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
};

const updateFinancialData = async (req, res) => {
  // Implement your update logic here
  res.status(200).json({ message: 'Update endpoint not implemented yet' });
};

const deleteFinancialData = async (req, res) => {
  // Implement your delete logic here
  res.status(200).json({ message: 'Delete endpoint not implemented yet' });
};

export { uploadFinancialData, getFinancialData, updateFinancialData, deleteFinancialData };
