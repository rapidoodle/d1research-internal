import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getLoggedUser } from "./users";

var userId = await getLoggedUser().id;
const createTag = async (req, isFormData = true) => {
  
    try {
      var name;
      if(!isFormData){
        name = req.name;
        userId = req.updated_by;
      }else{
       name = await req.json();
      }
        const result = await sql`
          INSERT INTO tags (name, updated_by) VALUES (${name}, ${userId}) RETURNING id, name;`;
        return { data: result.rows[0]};
      } catch (error) {
        console.error('Error adding tag:', error);
        return NextResponse.json({ message: 'Error adding tag' }, { status: 500 });
      }
  };

const getTags = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM tags`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching tags:', error);
    return { error: 'Error fetching tags' };
  }
};


const getTagByName = async (req) => {
  try {
    const result = await sql`SELECT * FROM tags WHERE name = ${req.name}`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching tags:', error);
    return { error: 'Error fetching tags' };
  }
};


export { createTag, getTags, getTagByName };
