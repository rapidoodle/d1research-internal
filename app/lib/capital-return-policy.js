import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getLoggedUser } from "./users";

export async function createCRP (req) {
  var userId = await getLoggedUser().id;
    try {
    const { comment, unique_url_key, company_id } = await req.json();

    console.log(comment, unique_url_key, company_id, userId);

      const result = await sql`
        INSERT INTO capital_return_policy (comment, company_id, updated_by)
        VALUES (${comment}, ${Number(company_id)}, ${userId})
        RETURNING id, comment, company_id, updated_by;
      `;
      
      return { data: result.rows[0]};
      
    } catch (error) {
        console.error('Error adding capital return policy:', error);
        return NextResponse.json({ message: 'Error adding capital return policy' }, { status: 500 });
    }
};

export async function updateCRP (req) {
    try {
        const body = await req.json();
        const result = await sql`
          UPDATE capital_return_policy
          SET comment = ${body.comment}
          WHERE id = ${body.id}
            RETURNING id, comment, updated_by;
        `;
    } catch (error) {
        console.error('Error updating capital return policy:', error);
        return { error: 'Error updating capital return policy' };
    }
}


export async function getCRPByCompanyID (req) {
    try {
        const result = await sql`SELECT * FROM capital_return_policy WHERE company_id = ${req.company_id}`;
    
        return { data: result.rows };
    
    } catch (error) {
        console.error('Error fetching capital return policy:', error);
        return { error: 'Error fetching capital return policy' };
    }
}


export async function getCRPByID (req) {
  try {
    const result = await sql`SELECT * FROM capital_return_policy WHERE id = ${req.id}`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching capital return policy:', error);
    return { error: 'Error fetching capital return policy' };
  }
};

export async function deleteCRP (req) {
  try {
    const result = await sql`DELETE FROM capital_return_policy WHERE id = ${req.id}`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error deleting capital return policy:', error);
    return { error: 'Error deleting capital return policy' };
  }
};
