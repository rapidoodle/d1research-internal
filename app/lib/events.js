import { sql } from "@vercel/postgres";
import { getLoggedUser } from "./users";
import { authOptions } from "@/auth";
import { cleanComment } from "./utils";
import { NextResponse } from "next/server";

  export async function createEvent(req) {
    const loggedInUser = await getLoggedUser(authOptions);
    if (req.method !== 'POST') {
      return { error: 'Method not allowed' };
    }
    
    try {
      const { 
        recurrence, 
        company, 
        allDay, 
        description, 
        assignees, 
        location, 
        sharing = 'MEMBERS', // default value
        startDate, 
        friendlyName, 
        tags 
      } = await req.json();

      const color = '#';
      const endDate = startDate;
      const newDescription = await cleanComment(description);

      // Insert data into the events table
      const query = `
        INSERT INTO events (
          recurrence, 
          company_id, 
          all_day, 
          color, 
          end_date, 
          description, 
          assignees, 
          location, 
          sharing, 
          start_date, 
          friendly_name, 
          tags,
          updated_by
        ) VALUES (
          ${recurrence}, 
          '${company}', 
          '${allDay}', 
          '${color}', 
          '${endDate}', 
          '${newDescription}', 
          '${assignees}', 
          '${location}', 
          '${sharing}', 
          '${startDate}', 
          '${friendlyName}', 
          '${tags}',
          '${loggedInUser.id}'
        );
      `

      console.log(query);
     const response =  await sql.query(query);

      // Assuming createCompanyAsNote is a function that interacts with another service
      // const clinkedResponse = await createClinkedEvent({
      //   recurrence, 
      //   allDay, 
      //   color, 
      //   endDate, 
      //   description, 
      //   assignees, 
      //   location, 
      //   sharing, 
      //   startDate, 
      //   friendlyName, 
      //   tags
      // });

      // if(!clinkedResponse){
      //   throw new Error('Failed to create event in Clinked');
      // }

      return NextResponse.json(response);
    } catch (error) {
      
      console.log(error);

      return { error: 'Error creating event' };
    }
  }

export async function getEvents(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  try {
    const offset = (currentPage - 1) * pageSize;
    const query = `SELECT e.*, c.name as company
    FROM events e LEFT JOIN companies c ON c.id = e.company_id
     WHERE e.friendly_name ILIKE $1 OR c.name ILIKE $1 LIMIT $2 OFFSET $3`;
     
    console.log(query);
    const values = [`%${search}%`, pageSize, offset];
    const result = await sql.query(query, values);
    
    const totalQuery = `
      SELECT COUNT(*) FROM events
      WHERE friendly_name ILIKE $1
    `;

    const totalResult = await sql.query(totalQuery, [`%${search}%`]);
    const totalRecords = parseInt(totalResult.rows[0].count, 10);

    return {
      data: result.rows,
      totalRecords,
      currentPage,
      pageSize,
    };

  } catch (error) {
    console.error('Error fetching companies:', error);
    return { error: 'Error fetching companies' };
  }
};
