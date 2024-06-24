import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const createTag = async (req, res) => {
    try {
        const { name } = await req.json();
        const result = await sql`
          INSERT INTO tags (name)
          VALUES (${name})
          RETURNING id, name;
        `;
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


export { createTag, getTags };
