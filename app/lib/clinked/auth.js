import config from "@/app/config/clinked";
import { getSession } from "next-auth/react";

export async function authenticate() {
    const url = `${config.baseURL}/oauth/token?client_id=clinked-mobile&grant_type=password&password=${process.env.CLINKED_PASSWORD}&username=${process.env.CLINKED_USERNAME}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(process.env.CLINKED_USERNAME, process.env.CLINKED_PASSWORD, url, response);

        if (!response.ok) {
            throw new Error(`Failed to authenticate with Clinked: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}



export async function getAccessToken(){
    const session = await getSession();

    if(session && session.access_token){
        return session.access_token;
    }else{
        const response = await authenticate();
        if(response && response.access_token){
            return response.access_token;
        }else{
            throw new Error('Failed to retrieve access token from Clinked');
        }
    }
}


export async function getRefreshToken(){
    const session = await getSession();

    if(session && session.access_token){
        return session.access_token;
    }else{
        const response = await authenticate();
        if(response && response.access_token){
            return response.access_token;
        }else{
            throw new Error('Failed to retrieve access token from Clinked');
        }
    }
}

//create company
export async function createCompanyAsNote(reqData) {
    try {
      
      // Retrieve the access token
      const accessToken = await getAccessToken();
  
    //   Define the request body for the API call
      const body = {
        friendlyName: reqData.name,
        content: `<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 1200px; border: 0;" src="${reqData.iframe_url}" title="Company page of ${reqData.name}" frameborder="0" allowfullscreen></iframe>`,
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
      
      console.log('response create: ', response);

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