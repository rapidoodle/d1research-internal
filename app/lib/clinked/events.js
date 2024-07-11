import config from "@/app/config/clinked";
import { getAccessToken } from "./auth";
import { formatClinkedDate } from "../utils";

//create company
export async function createClinkedEvent(reqData) {
    try {
      
      // Retrieve the access token
      const accessToken = await getAccessToken();
      
    //   Define the request body for the API call
      const body = {
        "recurrence" : null,
        "allDay" : true,
        "color" : "#2E9DFF",
        "endDate" : formatClinkedDate(reqData.startDate),
        'description' : reqData.c_description,
        "assignees" : ['rperez@d1research.com'],
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

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`Failed to create event`);
      }

      return data;
  
    } catch (error) {
      console.error('Error creating company as note:', error);
      throw error;
    }
  }

  
  export async function getAllClinkedEvents() {
    try {
      // Retrieve the access token
      const accessToken = await getAccessToken();

      // Make the API call to create the note
      const response = await fetch(`${config.baseURL}/v3/groups/${config.defaultGroup}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      // Parse the response body
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error creating company as note:', error);
      throw error;
}}