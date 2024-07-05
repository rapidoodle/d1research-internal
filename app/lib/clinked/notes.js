import config from "@/app/config/clinked";
import { getAccessToken } from "./auth";

//create company
export async function createCompanyAsNote(reqData) {
    try {
      
      // Retrieve the access token
      const accessToken = await getAccessToken();
      
      // Define the iframe URL, name should replace space with underscore
      const iframe_url = `https://internal.d1research.com/companies/${reqData.uniquerURLKey}`;
    //   Define the request body for the API call
      const body = {
        friendlyName: reqData.name,
        content: `<iframe sandbox style="position: absolute; top: 0; left: 0; width: 100%; height: 1200px; border: 0;" src="${iframe_url}" title="Company page of ${reqData.name}" frameborder="0" allowfullscreen></iframe>`,
        template: reqData.template || false,
        sharing: "MEMBERS",
        memberPermission: reqData.member_permission || 1,
        tags: reqData.tags,
        attachments: []
      };
  
      // Make the API call to create the note
      const response = await fetch(`${config.baseURL}/v3/groups/${config.defaultGroup}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });
      
      console.log('clinked response create: ', response);

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`Failed to create company: ${response.statusText}`);
      }
  
      console.log(accessToken);

      // Parse the response body
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error creating company as note:', error);
      throw error;
    }
  }

  