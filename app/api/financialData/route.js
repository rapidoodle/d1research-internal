import { NextResponse } from 'next/server';
import { uploadFinancialData, getFinancialData, updateFinancialData, deleteFinancialData } from '@/app/lib/financialData';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const fileUploadResponse = await uploadFinancialData(req);
    console.log('fileUploadResponse', fileUploadResponse);
    return NextResponse.json({ message: 'File processed successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const data = await getFinancialData(req);
    if (data.error) {
      return NextResponse.json({ message: data.error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching financial data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}