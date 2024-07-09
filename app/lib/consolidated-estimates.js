import { sql } from "@vercel/postgres";

export async function getConsolidatedEstimates() {
    try {
        const query = `
        WITH ranked_data AS (
          SELECT
            company,
            equity_ticker,
            year,
            dps_z,
            annual_return_percent,
            ROW_NUMBER() OVER (PARTITION BY company ORDER BY year DESC) AS rn
          FROM
            financial_data
        )
        SELECT
          company,
          equity_ticker,
          MAX(CASE WHEN rn = 4 THEN dps_z END) AS z1,
          MAX(CASE WHEN rn = 3 THEN dps_z END) AS z2,
          MAX(CASE WHEN rn = 2 THEN dps_z END) AS z3,
          MAX(CASE WHEN rn = 1 THEN dps_z END) AS z4,
          MAX(CASE WHEN rn = 4 THEN annual_return_percent END) AS z5,
          MAX(CASE WHEN rn = 3 THEN annual_return_percent END) AS z6,
          MAX(CASE WHEN rn = 2 THEN annual_return_percent END) AS z7,
          MAX(CASE WHEN rn = 1 THEN annual_return_percent END) AS z8
        FROM
          ranked_data
        WHERE
          rn <= 4
        GROUP BY
          company, equity_ticker;
        `;
      const result = await sql.query(query);
      console.log(result.rows);
      return { data: result.rows };
    } catch (error) {
      console.error('Error fetching companies:', error);
      return { error: 'Error fetching companies' };
    }
  }
  