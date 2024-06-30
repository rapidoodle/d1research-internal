import { NextResponse } from 'next/server';
import { createEvent, getEvents } from '@/app/lib/events';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const data = await createEvent(req);

    if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function GET(req) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const data = await getEvents(req);
        if (data.error) {
            return NextResponse.json({ message: data.error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}