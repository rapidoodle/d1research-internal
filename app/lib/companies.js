import { sql } from "@vercel/postgres";

const createCompany = async (req) => {
  if (req.method !== 'POST') {
    return { error: 'Method not allowed' };
  }
  
  try {
    const { name, sector_id, tags, iframe_url, template, member_permission } = await req.json();

    if (!name || !sector_id) {
      return { error: 'Name, sector_id and tags are required' };
    }

    await sql`
      INSERT INTO companies (name, sector_id, tags, iframe_url, template, member_permission, sharing)
      VALUES (${name}, ${sector_id}, ${tags}, ${iframe_url}, ${template}, ${member_permission}, 'MEMBERS');
    `;

    return { message: 'Company created successfully' };
  } catch (error) {
    console.error('Error creating company:', error);
    return { error: 'Error creating company' };
  }
};

const getCompanies = async (req, res) => {
  try {
    const result = await sql`SELECT c.name as company, s.name as sector, c.tags, c.iframe_url as iframe FROM companies c LEFT JOIN sectors s ON c.sector_id = s.id`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching companies:', error);
    return { error: 'Error fetching companies' };
  }
};

const updateCompany = async (req, res) => {
  const { id, name, sector_id } = req.body;

  try {
    await sql`
      UPDATE companies
      SET name = ${name}, sector_id = ${sector_id}
      WHERE id = ${id};
    `;
    res.status(200).json({ message: 'Company updated successfully' });
  } catch (error) {
    console.error('Error updating company', error);
    res.status(500).json({ message: 'Error updating company' });
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.body;

  try {
    await sql`DELETE FROM companies WHERE id = ${id}`;
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company', error);
    res.status(500).json({ message: 'Error deleting company' });
  }
};

export { createCompany, getCompanies, updateCompany, deleteCompany };
