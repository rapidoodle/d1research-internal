import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getLoggedUser } from "./users";
import { cleanComment } from "./utils";

export async function createAC (req) {
  var user = await getLoggedUser();
    
  try {
    const { comment, unique_url_key, company_id } = await req.json();
    
    const newComment = await cleanComment(comment);
    const query =`
        INSERT INTO analysts_comments (comment, company_id, updated_by)
        VALUES ('${newComment}', '${company_id}', '${user.id}')
        RETURNING id, comment, company_id, updated_by;
      `

      const result = await sql.query(query);
      
      return { data: result.rows[0]};
      
    } catch (error) {
        console.error('Error adding analysts comments:', error);
        return NextResponse.json({ message: 'Error adding analysts comments' }, { status: 500 });
    }
};

export async function updateAC (req) {
    var user = await getLoggedUser();
    try {
        const newComment = await cleanComment(req.comment);
        const query = `
          UPDATE analysts_comments
          SET comment = '${newComment}', updated_by = '${user.id}'
          WHERE id = '${req.id}'
            RETURNING id, comment, updated_by;
        `;

        const result = await sql.query(query);
        return { data: result.rows[0] };

    } catch (error) {
        console.error('Error updating analysts comments:', error);
        return NextResponse.json({ message: 'Error updating analysts comments' }, { status: 500 });
    }
}


export async function getACByCompanyID (companyID, limit, showAll) {

    try {
        const query = `SELECT * FROM analysts_comments WHERE company_id = '${companyID}' ORDER BY created_at DESC ` + (showAll ? '' : `LIMIT ${limit}`);
        
        const result = await sql.query(query);
        return { data: result.rows };

    } catch (error) {
        console.error('Error fetching analysts comments:', error);
        return NextResponse.json({ message: 'Error fetching analysts comments' }, { status: 500 });
    }
}


export async function getACByID (req) {
  try {
    const result = await sql`SELECT * FROM analysts_comments WHERE id = ${req.id}`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching analysts comments:', error);
    return NextResponse.json({ message: 'Error fetching analysts comments' }, { status: 500 });
  }
};

export async function deleteAC (companyID) {
  try {
    const query = `DELETE FROM analysts_comments WHERE id = '${companyID}'`;
    console.log(query);
    const result = await sql.query(query);

    return { data: result.rows };

  } catch (error) {
    console.error('Error deleting analysts comments:', error);
    return NextResponse.json({ message: 'Error deleting analysts comments' }, { status: 500 });
  }
};
