import { sql } from "@vercel/postgres";
import { createCompanyAsNote } from "./clinked/notes";
import { getLoggedUser } from "./users";

const createCompany = async (req, isFormData = true) => {
  var userId = await getLoggedUser().id;
  
  try {
    var name, sector_id, tags, template, member_permission, equity_ticker;
    if (!isFormData) {
      name = req.name;
      sector_id = req.sector_id;
      tags = req.tags;
      template = req.template;
      member_permission = req.member_permission;
      equity_ticker = req.equity_ticker;
      userId = req.updated_by;
    }else{
      const body = await req.json();
      name = body.name;
      sector_id = body.sector_id;
      tags = body.tags;
      template = body.template;
      member_permission = body.member_permission;
    }

    if (!name || !sector_id) {
      return { error: 'Name, sector_id and tags are required' };
    }

    const query = `
      INSERT INTO companies (name, equity_ticker, sector_id, tags, template, member_permission, sharing, updated_by)
      VALUES ('${name}', '${equity_ticker}', '${sector_id}', '${tags}', ${template}, ${member_permission}, 'MEMBERS', '${userId}')
      RETURNING unique_url_key, id;
    `;

    const result = await sql.query(query);
    // const uniquerURLKey = result.rows[0].unique_url_key
    // const companyID = result.rows[0].id

    // if success, send company to clinked
    //  await createCompanyAsNote({ name, sector_id, tags, template, member_permission, uniquerURLKey, companyID });

    return { data: result.rows[0]};
  } catch (error) {
    console.error('Error creating company:', error);
    return { error: 'Error creating company' };
  }
};

export async function getCompanyByTicker(ticker) {
  try {
    const query = `SELECT * FROM companies WHERE equity_ticker = '${ticker}'`;
    const result = await sql.query(query);
    return { data: result };
  } catch (error) {
    console.error('Error fetching company:', error);
    return { error: 'Error fetching company' };
  }
}

export async function getAllCompanies(fields) {
  try {
    const query = `SELECT ${fields} FROM companies`;
    const result = await sql.query(query);
    return { data: result.rows };
  } catch (error) {
    console.error('Error fetching companies:', error);
    return { error: 'Error fetching companies' };
  }
}

export async function getCompanies(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const pageSize = searchParams.get('pageSize'); // Read pageSize as a string

  try {
    // Base query
    let query = `SELECT c.id as company_id, c.equity_ticker, c.unique_url_key as url_key, c.name as company, s.name as sector, c.tags
    FROM companies c LEFT JOIN sectors s ON c.sector_id = s.id
    WHERE c.name ILIKE $1 ORDER BY c.name ASC`;
    
    // Values for the base query
    let values = [`%${search}%`];
    
    // Modify query if pageSize is provided
    if (pageSize) {
      const offset = (currentPage - 1) * parseInt(pageSize, 10);
      query += ` LIMIT $2 OFFSET $3`;
      values.push(parseInt(pageSize, 10), offset);
    }
    
    const result = await sql.query(query, values);

    // Get the total number of records
    const totalQuery = `SELECT COUNT(*) FROM companies WHERE name ILIKE $1`;
    const totalResult = await sql.query(totalQuery, [`%${search}%`]);
    const totalRecords = parseInt(totalResult.rows[0].count, 10);

    return {
      data: result.rows,
      totalRecords,
      currentPage,
      pageSize: pageSize ? parseInt(pageSize, 10) : totalRecords, // If no pageSize, return totalRecords as pageSize
    };

  } catch (error) {
    console.error('Error fetching companies:', error);
    return { error: 'Error fetching companies' };
  }
};


export async function getCompanyByName(req){
  try {
    const query = `SELECT * FROM companies WHERE LOWER(name) LIKE $1`;
    const result = await sql.query(query, [req.name]);
    return { data: result.rows[0] };

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
