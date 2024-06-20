import { NextResponse } from 'next/server';
import { createCompany } from '@/app/lib/companies';
import { getSectors, createSectors } from '@/app/lib/sectors';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req) {
    const data = await createSectors(req);
    if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function GET(req) {
  try {
    const data = await getSectors(req);
    if (data.error) {
      return NextResponse.json({ message: data.error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}