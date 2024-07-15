import { sql } from "@vercel/postgres";
import { getLoggedUser } from "./users";
import { authOptions } from "@/auth";
import { cleanComment, cleanedString } from "./utils";
import { NextResponse } from "next/server";
import moment from "moment";

  export async function createEvent(req, isForm = false) {

    const loggedInUser = await getLoggedUser(authOptions);

    if (req.method !== 'POST' && isForm) {
      return { error: 'Method not allowed' };
    }
    
    try {
      var recurrence, 
      company, 
      allDay, 
      description, 
      c_description, 
      assignees, 
      location, 
      sharing = 'MEMBERS', // default value
      startDate, 
      endDate,
      friendlyName, 
      tags;

      if(isForm){
        const formData = await req.json();
        recurrence = formData.get('recurrence');
        company = formData.get('company');
        allDay = true;
        description = formData.get('description');
        assignees = formData.get('assignees');
        location = formData.get('location');
        sharing = formData.get('sharing');
        startDate = formData.get('startDate');
        endDate = formData.get('startDate');
        friendlyName = formData.get('friendlyName');
        tags = formData.get('tags');
      } else {
        recurrence = false;
        company = req.company_id;
        allDay = true;
        description = req.c_description;
        c_description = req.c_description;
        assignees = '[]';
        location = 'Online';
        startDate = req.date;
        endDate   = req.end_date ? req.end_date : req.date;
        friendlyName = req.friendly_name;
        tags = `${req.name}, ${req.tags}`;
      }

      const color           = '#2E9DFF';
      startDate = moment(startDate).format('YYYY-MM-DD');

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
          $1, 
          '${assignees}', 
          '${location}', 
          '${sharing}', 
          '${startDate}', 
          $2, 
          '${tags}',
          '${loggedInUser.id}'
        );
      `;

     const response =  await sql.query(query, [description, friendlyName]);

      // return NextResponse.json([{ message: 'Event created successfully' }]);
      return NextResponse.json(response);
    } catch (error) {
      
      console.log(error);

      return { error: 'Error creating event' };
    }
}

export async function updateEvent(req) {
  const loggedInUser = await getLoggedUser(authOptions);

  if (req.method !== 'PATCH') {
    return { error: 'Method not allowed' };
  }

  try {
    const { id, description, friendlyName, location, startDate, tags, company } = await req.json();

    console.log(id, description, friendlyName, location, startDate, tags, company);

    const newDescription = await cleanComment(description);
    const newFriendlyName = await cleanComment(friendlyName);

    const query = `
      UPDATE events
      SET description = $1, 
      friendly_name = $2,  
      location = $3,  
      start_date = $4,  
      end_date = $4,  
      tags = $5,  
      company_id = $6,  
      updated_by = '${loggedInUser.id}'
      WHERE id = $7
    `;

    const response = await sql.query(query, [description, newFriendlyName, location, startDate, tags, company.value, id]);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error updating event:', error);
    return { error: 'Error updating event' };
  }
}

export async function setEventStatus(req) {
  const loggedInUser = await getLoggedUser(authOptions);

  try {
    const { id, status } = req;

    const query = `
      UPDATE events
      SET status = $1, 
      updated_by = '${loggedInUser.id}'
      WHERE id = $2
    `;

    const response = await sql.query(query, [status, id]);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error updating event status:', error);
    return { error: 'Error updating event status' };
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

export async function getEventByDateAndDescription(companyId, date, description){
  try {
    const query = `SELECT id FROM events WHERE start_date = $1 AND friendly_name = $2 AND company_id = $3`;
    const result = await sql.query(query, [date, description, companyId]);

    return { data: result.rowCount };
  }catch (error){
    console.error('Error fetching event:', error);
    return { error: 'Error fetching event' };
  }
}
