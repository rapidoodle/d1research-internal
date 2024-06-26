//CLINKED ENDPOINTS TO ADD/EDIT/DELETE COMPANIES AS A *NOTE*
import { getAccessToken } from "@/app/lib/clinked";

export async function GET(){
    const response = await fetch(`${config.baseURL}/v3/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application',
            'Authorization': `Bearer ${await getAccessToken()}`
        }
    });
    
    return NextResponse.next(response);
}