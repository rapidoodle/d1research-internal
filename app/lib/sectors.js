import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getLoggedUser } from "./users";

const createSectors = async (req, isFormData = true) => {
  var userId = await getLoggedUser().id;

    try {
      var name;
      if(isFormData){
        name = await req.json();
      }else{
        name = req.name;
        userId = req.updated_by;
      }
      
      console.log('user id in sector: ', userId);

      const result = await sql`
        INSERT INTO sectors (name, updated_by)
        VALUES (${name}, ${userId})
        RETURNING id, name, updated_by;
      `;
      
      return { data: result.rows[0]};
      
    } catch (error) {
        console.error('Error adding sector:', error);
        return NextResponse.json({ message: 'Error adding sector' }, { status: 500 });
      }
  };

const getSectors = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM sectors`;

    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching sectors:', error);
    return { error: 'Error fetching sectors' };
  }
};

const getSectorByName = async (req) => {
  try {
    const result = await sql`SELECT * FROM sectors WHERE name = ${req.name}`;
    return { data: result.rows };

  } catch (error) {
    console.error('Error fetching sectors:', error);
    return { error: 'Error fetching sectors' };
  }
};


export { createSectors, getSectors, getSectorByName };
