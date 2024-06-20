import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const createSectors = async (req, res) => {
    try {
        const { name } = await req.json();
        const result = await sql`
          INSERT INTO sectors (name)
          VALUES (${name})
          RETURNING id, name;
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


export { createSectors, getSectors };
