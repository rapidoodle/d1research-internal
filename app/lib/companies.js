import { sql } from "@vercel/postgres";

const createCompany = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, sector_id } = req.body;
  try {
    await sql`
      INSERT INTO companies (name, sector_id)
      VALUES (${name}, ${sector_id});
    `;
    res.status(201).json({ message: 'Company created successfully' });
  } catch (error) {
    console.error('Error creating company', error);
    res.status(500).json({ message: 'Error creating company' });
  }
};

const getCompanies = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM companies`;
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching companies', error);
    res.status(500).json({ message: 'Error fetching companies' });
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
