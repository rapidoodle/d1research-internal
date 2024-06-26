import config from "@/app/config/clinked";
import { getAccessToken } from "@/app/lib/clinked";
import { NextResponse } from "next/server";


export async function GET() {
    console.log('getting groupp...');
    const accessToken = await getAccessToken();
  
    const response = await fetch(`${config.baseURL}/v3/accounts/21564/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if(!response.ok){
        throw new Error(`Failed to fetch groups: ${response.statusText}`);
    }else{
        const data = await response.json();
        return NextResponse.json({data: data});
    }
  }
