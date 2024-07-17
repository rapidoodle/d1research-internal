import config from "@/app/config/clinked";
import { getAccessToken } from "./auth";
import { formatClinkedDate } from "../utils";
import moment from "moment";
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from "@vercel/postgres";
import { getLoggedUser } from "../users";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//create company
export async function createClinkedEvent(reqData) {
    try {
      
      const loggedInUser = await getLoggedUser(authOptions);
  // Retrieve the access token
      const accessToken = await getAccessToken();
      
    //   Define the request body for the API call
      const body = {
        "recurrence" : null,
        "allDay" : true,
        "color" : "#2E9DFF",
        "endDate" : formatClinkedDate(moment(reqData.startDate).add(1, 'days')),
        'description' : reqData.description,
        "assignees" : ['contact@d1research.com'],
        "location" : reqData.location,
        "sharing" : "MEMBERS",
        "startDate" : formatClinkedDate(reqData.startDate),
        "memberPermission": 1,
        "friendlyName" : reqData.friendlyName,
        "tags" : reqData.tags
      };

      console.log(body);

      // Make the API call to create the note
      const response = await fetch(`${config.baseURL}/v3/groups/${config.defaultGroup}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });
      
      // Parse the response body
      const data = await response.json();

      //update the event with the clinked id
      const clinked_id = data.id;

      const updateQuery = `UPDATE events SET clinked_id = $1, updated_by = $2 WHERE id = $3`;
      const updateResponse = await sql.query(updateQuery, [clinked_id, loggedInUser.id, reqData.id]);

      console.log('update event with clinked id:', updateResponse, clinked_id, loggedInUser.id, reqData);

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`Failed to create event`);
      }

      return 'Event created successfully';
  
    } catch (error) {
      console.error('Error creating company as note:', error);
      throw error;
    }
  }

  
  export async function getAllClinkedEvents() {
    try {
      noStore();
      // Retrieve the access token
      const accessToken = await getAccessToken();

      // Make the API call to create the note
      const today = moment().format('YYYY-MM-DD');
      const twoYearsLater = moment().add(1, 'years').format('YYYY-MM-DD');
      const query = `${config.baseURL}/v3/groups/${config.defaultGroup}/events?dateStart=${today}&dateEnd=${twoYearsLater}`;
      
      const response = await fetch(query, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      // Parse the response body
      const data = await response.json();

      console.log('Clinked events:', query, accessToken, data);

      return data;
    } catch (error) {
      console.error('Error creating company as note:', error);
      throw error;
}}

export async function deleteClinkedEvent(eventId) {
    try {
      // Retrieve the access token
      const accessToken = await getAccessToken();
      const query = `${config.baseURL}/v3/groups/${config.defaultGroup}/events/${eventId}`;

      // Make the API call to create the note
      const response = await fetch(query, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // Parse the response body
      const data = await response.json();


      //update the event with the clinked id
     const updateQuery = `UPDATE events SET clinked_id = NULL, status = 0 WHERE clinked_id = $1`;
     const updateResponse = await sql.query(updateQuery, [eventId]);


      console.log('Clinked event deleted:', data, updateResponse);

      return data;
    } catch (error) {
      console.error('Error creating company as note:', error);
      throw error;
}}