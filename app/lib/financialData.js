import { sql } from '@vercel/postgres';
import { parse } from 'csv-parse';
import { readFile, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { cleanCurrency } from './utils';

export async function uploadFinancialData (req, res) {
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
      //Remove all from financial_data table to avoid duplicates
      await sql `DELETE FROM financial_data;`;

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
