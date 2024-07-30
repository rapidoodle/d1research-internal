import { sql } from "@vercel/postgres";

export async function getPremiumDiscounts() {
    try {
        const query = `SELECT equity_ticker, year, dps_z, current_price_z FROM financial_data ORDER BY equity_ticker ASC, year DESC`;
        const result = await sql.query(query);
        return { data: result.rows };
    } catch (error) {
        console.error('Error fetching companies:', error);
        return { error: 'Error fetching companies' };
    }
  }
  