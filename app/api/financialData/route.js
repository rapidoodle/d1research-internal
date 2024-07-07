import { NextResponse } from 'next/server';
import { uploadFinancialData, getFinancialData, getFinancialDataByCompanyKey } from '@/app/lib/financialData';

// This function can run for a maximum of 5 seconds
export const config = {
  maxDuration: 5000,
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

  const { searchParams } = new URL(req.url);
  const uniqueUrlKey = searchParams.get('unique_url_key');

  if(!uniqueUrlKey) {
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
  }else{
    try {
      const data = await getFinancialDataByCompanyKey(uniqueUrlKey);

      if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
      }
      return NextResponse.json(data);
    } catch (error) {
      console.error(`Error fetching financial data for : ${uniqueUrlKey}`, error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
}