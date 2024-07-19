import { deleteClinkedEvent } from "@/app/lib/clinked/events";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    if (req.method !== 'DELETE') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        //get id from query 'https://api.clinked.com/v3/groups/1/events/1'
        
        const url = new URL(req.url);
        const pathParts = url.pathname.split('/');
        const eventId = pathParts[4];
        const data = await deleteClinkedEvent(eventId);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}