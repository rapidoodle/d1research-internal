import { sql } from "@vercel/postgres";

const getUniqueKey = async (key) => {
  try {
    const query = `SELECT * FROM unique_keys`;
    const result = await sql.query(query);
    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching tags:', error);
    return { error: 'Error fetching tags' };
  }
};



export { getUniqueKey };
