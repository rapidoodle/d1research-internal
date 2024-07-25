import { sql } from "@vercel/postgres";
import { getLoggedUser } from "./users";
import { authOptions } from "@/auth";
import { NextResponse } from "next/server";
import moment from "moment";
import { createClinkedEvent } from "./clinked/events";
import { unstable_noStore as noStore } from 'next/cache';


  export async function createEvent(req, isForm = false) {

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

        recurrence = formData.recurrence;
        company = formData.company;
        allDay = true;
        description = formData.description;
        c_description = formData.description;
        assignees = formData.assignees;
        location = formData.location;
        sharing = formData.sharing;
        startDate = formData.startDate;
        endDate = formData.startDate;
        friendlyName = formData.friendlyName;
        tags = formData.tags;

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

      const color  = '#2E9DFF';
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
          tags
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
          '${tags}'
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

  try {
    const { id, description, friendlyName, location, startDate, tags, company } = req;

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

    const response = await sql.query(query, [description, friendlyName, location, startDate, tags, company.value, id]);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error updating event:', error);
    return { error: 'Error updating event' };
  }
}

export async function setEventStatus(req) {

  //STATUS 
  // 0 - Pending
  // 1 - Approved
  // 2 - Ignored

  const loggedInUser = await getLoggedUser(authOptions);

  try {
    const { id, status } = req;

    const query = `
      UPDATE events
      SET status = $1, 
      updated_by = '${loggedInUser.id}'
      WHERE id = $2
      RETURNING *
    `;

    const response = await sql.query(query, [status, id]);
    const returns = response.rows[0];

    //push the event to clinked if approved
    if(status === 1){
      const body = {
        id: returns.id,
        description: returns.description,
        friendlyName: returns.friendly_name,
        location: returns.location,
        startDate: returns.start_date,
        // endDate: returns.end_date,
        memberPermission: 1,
        tags: returns.tags
      };

      console.log('clinked body:', body);

      const clinkedResponse = await createClinkedEvent(body);
      console.log('clinkedResponse:', clinkedResponse);
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error updating event status:', error);
    return { error: 'Error updating event status' };
  }
}

export async function getEventByEquityTicker(equityTicker) {
  try {

    //query to select events based on equity ticker from companies table
    const query = `SELECT e.start_date, e.friendly_name, e.source_url FROM events e LEFT JOIN companies c  ON c.id = e.company_id WHERE c.equity_ticker = $1 AND e.status = 1 ORDER BY e.start_date ASC`;
    const result = await sql.query(query, [equityTicker]);

    return { data: result.rows };

  } catch (error) {

    console.error('Error fetching event:', error);

    return { error: 'Error fetching event' };
  }
}


export async function getEvents(req) {

  noStore();

  const { searchParams } = new URL(req.url);
  const search      = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const pageSize    = parseInt(searchParams.get('pageSize') || '10', 10);
  const status      = searchParams.get('status');

  try {
    const offset = (currentPage - 1) * pageSize;
    const query = `SELECT e.*, c.name as company
    FROM events e LEFT JOIN companies c ON c.id = e.company_id
     WHERE (e.friendly_name ILIKE $1 OR c.name ILIKE $1) AND e.status = $2 ORDER BY company ASC LIMIT $3 OFFSET $4`;
     
    console.log(query);
    const values = [`%${search}%`, status, pageSize, offset];
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
