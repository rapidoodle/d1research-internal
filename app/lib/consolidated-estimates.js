import { sql } from "@vercel/postgres";

export async function getConsolidatedEstimates() {
    try {
        const query = `
        WITH ranked_data AS (
          SELECT
            company,
            equity_ticker,
            year,
            d1_central,
            annual_return_percent,
            ROW_NUMBER() OVER (PARTITION BY company ORDER BY year DESC) AS rn
          FROM
            financial_data
        )
        SELECT
          company,
          equity_ticker,
          MAX(CASE WHEN rn = 4 THEN d1_central END) AS z1,
          MAX(CASE WHEN rn = 3 THEN d1_central END) AS z2,
          MAX(CASE WHEN rn = 2 THEN d1_central END) AS z3,
          MAX(CASE WHEN rn = 1 THEN d1_central END) AS z4,
          MAX(CASE WHEN rn = 4 THEN annual_return_percent END) AS z5,
          MAX(CASE WHEN rn = 3 THEN annual_return_percent END) AS z6,
          MAX(CASE WHEN rn = 2 THEN annual_return_percent END) AS z7,
          MAX(CASE WHEN rn = 1 THEN annual_return_percent END) AS z8
        FROM
          ranked_data
        WHERE
          rn <= 4
        GROUP BY
          company, equity_ticker
        ORDER BY
          equity_ticker ASC;
        `;
      const result = await sql.query(query);
      return { data: result.rows };
    } catch (error) {
      console.error('Error fetching companies:', error);
      return { error: 'Error fetching companies' };
    }
  }
  