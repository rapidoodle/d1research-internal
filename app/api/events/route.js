import { NextResponse } from 'next/server';
import { createEvent, deleteEvent, getEventByEquityTicker, getEvents, setEventStatus, updateEvent } from '@/app/lib/events';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const data = await createEvent(req, true);

    if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function GET(req) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const { searchParams } = new URL(req.url);
    const equityTicker = searchParams.get('equity_ticker');
    const type         = searchParams.get('type');

    try {
        if(!type){
            
            const data = await getEvents(req);
            if (data.error) {
                return NextResponse.json({ message: data.error }, { status: 500 });
            }
            
            return NextResponse.json(data);
        }else{
            const data = await getEventByEquityTicker(equityTicker);
            if (data.error) {
                return NextResponse.json({ message: data.error }, { status: 500 });
            }

            return NextResponse.json(data);
        }
        } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req) {
    if (req.method !== 'PATCH') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    const request = await req.json();
    let data;

    if(request.action && request.action === 'set-status') {
        data = await setEventStatus(request);
    }else{
        data = await updateEvent(request);
        if (data.error) {
            return NextResponse.json({ message: data.error }, { status: 500 });
        }
    }

    return NextResponse.json(data);

}

export async function DELETE(req) {
    if (req.method !== 'DELETE') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const request = await req.json();

    console.log(request);
    const data = await deleteEvent(request.id);

    if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
}
