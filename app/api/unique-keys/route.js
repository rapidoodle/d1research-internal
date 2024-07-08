import { NextResponse } from 'next/server';
import { createTag, getTags } from '@/app/lib/tags';
import { getUniqueKey } from '@/app/lib/unique-keys';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};

export async function GET(req) {
    const searchParams = new URL(req.url).searchParams;
    const key = searchParams.get('key');

  try {
    const data = await getUniqueKey(key);
    if (data.error) {
      return NextResponse.json({ message: data.error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}