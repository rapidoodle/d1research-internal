import { NextResponse } from 'next/server';
import { createEvent, getEvents } from '@/app/lib/events';
import { getAllClinkedEvents } from '@/app/lib/clinked/events';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};

export async function GET(req) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const data = await getAllClinkedEvents();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}