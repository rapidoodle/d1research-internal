import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getLoggedUser } from "./users";
import { cleanComment } from "./utils";

export async function createCRP (req) {
  var user = await getLoggedUser();
    
  try {
    const { comment, unique_url_key, company_id } = await req.json();
    
    const query =`
        INSERT INTO capital_return_policy (comment, company_id, updated_by)
        VALUES ($1, $2, $3)
        RETURNING id, comment, company_id, updated_by;
      `

      const result = await sql.query(query, [comment, company_id, user.id]);
      
      return { data: result.rows[0]};
      
    } catch (error) {
        console.error('Error adding capital return policy:', error);
        return NextResponse.json({ message: 'Error adding capital return policy' }, { status: 500 });
    }
};

export async function updateCRP (req) {
    var user = await getLoggedUser();
    try {

      const query = `
          UPDATE capital_return_policy
          SET comment = $1, updated_by = $2, updated_at = NOW()
          WHERE id = $3 RETURNING id, comment, updated_by;
        `;

        const result = await sql.query(query, [req.comment, user.id, req.id] );


        return { data: result.rows[0] };

    } catch (error) {
        console.error('Error updating capital return policy:', error);
        return NextResponse.json({ message: 'Error updating capital return policy' }, { status: 500 });
    }
}


export async function getCRPByCompanyID (companyID, limit, showAll) {

    try {
        const query = `SELECT * FROM capital_return_policy WHERE company_id = '${companyID}' ORDER BY created_at DESC ` + (showAll ? '' : `LIMIT ${limit}`);
        
        const result = await sql.query(query);
        return { data: result.rows };

    } catch (error) {
        console.error('Error fetching capital return policy:', error);
        return NextResponse.json({ message: 'Error fetching capital return policy' }, { status: 500 });
    }
}


export async function getCRPByID (req) {
  try {
    const result = await sql`SELECT * FROM capital_return_policy WHERE id = ${req.id}`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching capital return policy:', error);
    return NextResponse.json({ message: 'Error fetching capital return policy' }, { status: 500 });
  }
};

export async function deleteCRP (companyID) {
  try {
    const query = `DELETE FROM capital_return_policy WHERE id = '${companyID}'`;
    const result = await sql.query(query);

    return { data: result.rows };

  } catch (error) {
    console.error('Error deleting capital return policy:', error);
    return NextResponse.json({ message: 'Error deleting capital return policy' }, { status: 500 });
  }
};
