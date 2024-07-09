import { NextResponse } from 'next/server';
import { createAC, deleteAC, getACByCompanyID, updateAC } from '../../lib/d1-analyst-comments';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
  try {
      const data = await createAC(req);

      return NextResponse.json(data);

  }catch (error) {
      console.error('Error adding analysts comments:', error);
      return NextResponse.json({ message: 'Error adding analysts comments' }, { status: 500 });
  }
}

export async function GET(req) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const { searchParams } = new URL(req.url);
    const companyID = searchParams.get('company_id') || '';
    const limit     = searchParams.get('limit') || '';
    const showAll   = searchParams.get('showAll') || '';
    const showAllBool = showAll === 'true' ? true : false;

    try {
        const data = await getACByCompanyID(companyID, limit, showAllBool);

    if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
    } catch (error) {

    console.error('Error fetching analysts comments:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const body = await req.json();
        const data = await updateAC(body);
        if (data.error) {
            return NextResponse.json({ message: data.error }, { status: 500 });
        }
        return NextResponse.json(body);
    } catch (error) {
        console.error('Error updating analysts comments:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req) {

    const { searchParams } = new URL(req.url);
    const companyID = searchParams.get('comment_id') || '';

    try {
        console.log('DELETE THIS:', companyID);
        const data = await deleteAC(companyID);
        if (data.error) {
            return NextResponse.json({ message: data.error }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error deleting analysts comments:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}