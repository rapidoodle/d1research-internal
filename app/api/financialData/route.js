import { NextResponse } from 'next/server';
import { uploadFinancialData, getFinancialData, updateFinancialData, deleteFinancialData } from '@/app/lib/financialData';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ message: 'Missing type query parameter' }, { status: 400 });
  }

  switch (type) {
    case 'financial_data':
      await uploadFinancialData(req);
      return NextResponse.json({ message: 'File processed successfully' });
    default:
      return NextResponse.json({ message: 'Invalid type query parameter' }, { status: 400 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ message: 'Missing type query parameter' }, { status: 400 });
  }

  switch (type) {
    case 'financial_data':
        const data = await getFinancialData(req);
        if (data.error) {
            return NextResponse.json({ message: data.error }, { status: 500 });
        }
        return NextResponse.json(data);
    default:
      return NextResponse.json({ message: 'Invalid type query parameter' }, { status: 400 });
  }

  switch (type) {
    case 'financial_data':
      const data = await getFinancialData(req);
      return NextResponse.json(data);
    default:
      return NextResponse.json({ message: 'Invalid type query parameter' }, { status: 400 });
  }
}