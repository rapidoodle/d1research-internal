import { sql } from "@vercel/postgres";
import { createCompanyAsNote } from "./clinked/notes";

const createCompany = async (req) => {
  if (req.method !== 'POST') {
    return { error: 'Method not allowed' };
  }
  
  try {
    const { name, sector_id, tags, template, member_permission } = await req.json();

    if (!name || !sector_id) {
      return { error: 'Name, sector_id and tags are required' };
    }

    await sql`
      INSERT INTO companies (name, sector_id, tags, template, member_permission, sharing)
      VALUES (${name}, ${sector_id}, ${tags}, ${template}, ${member_permission}, 'MEMBERS');
    `;

    // if success, send company to clinked

    const clinkedResponse = await createCompanyAsNote({ name, sector_id, tags, template, member_permission });

    return { message: 'Company created successfully' };
  } catch (error) {
    console.error('Error creating company:', error);
    return { error: 'Error creating company' };
  }
};

export async function getCompanies(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  try {
    const offset = (currentPage - 1) * pageSize;
    const query = `SELECT c.id as company_id, c.name as company, s.name as sector, c.tags
    FROM companies c LEFT JOIN sectors s ON c.sector_id = s.id
     WHERE c.name ILIKE $1 LIMIT $2 OFFSET $3`;
     
    const values = [`%${search}%`, pageSize, offset];
    const result = await sql.query(query, values);
    
    const totalQuery = `
      SELECT COUNT(*) FROM companies
      WHERE name ILIKE $1
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
    console.error('Error fetching companies:', error);
    return { error: 'Error fetching companies' };
  }
};

export async function updateCompany(companyData) {
  try {
    const { id, name, sector_id, tags, template, member_permission } = companyData;
    const { rows } = await sql`
      UPDATE financial_table
      SET name=${name}, sector_id=${sector_id}, tags=${tags}, template=${template}, member_permission=${member_permission}
      WHERE id=${id}
      RETURNING *`;
    return rows[0];
  } catch (error) {
    console.error('Error updating company:', error);
    return { error: 'Error updating company' };
  }
}

export async function deleteCompany(id) {
  try {
    const { rows } = await sql`
      DELETE FROM financial_table
      WHERE id=${id}
      RETURNING *`;
    return rows[0];
  } catch (error) {
    console.error('Error deleting company:', error);
    return { error: 'Error deleting company' };
  }
}

export { createCompany };
