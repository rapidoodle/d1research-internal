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
