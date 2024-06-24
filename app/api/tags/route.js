import { NextResponse } from 'next/server';
import { createTag, getTags } from '@/app/lib/tags';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req) {
    const data = await createTag(req);
    if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function GET(req) {
  try {
    const data = await getTags(req);
    if (data.error) {
      return NextResponse.json({ message: data.error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}