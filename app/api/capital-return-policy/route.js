import { createCRP, deleteCRP, getCRPByCompanyID, updateCRP } from '@/app/lib/capital-return-policy';
import { NextResponse } from 'next/server';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
  try {
      const data = await createCRP(req);

      return NextResponse.json(data);

  }catch (error) {
      console.error('Error adding capital return policy:', error);
      return NextResponse.json({ message: 'Error adding capital return policy' }, { status: 500 });
  }
}

export async function GET(req) {
  if (req.method !== 'GET') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const data = await getCRPByCompanyID(re);

    if (data.error) {
      return NextResponse.json({ message: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching capital return policy:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req) {
    try {
        const data = await updateCRP(req);
        if (data.error) {
            return NextResponse.json({ message: data.error }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating capital return policy:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const data = await deleteCRP(req);
        if (data.error) {
            return NextResponse.json({ message: data.error }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error deleting capital return policy:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}