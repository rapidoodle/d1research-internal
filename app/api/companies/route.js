import { NextResponse } from 'next/server';
import { uploadFinancialData, getFinancialData, updateFinancialData, deleteFinancialData } from '@/app/lib/financial-data';
import { createCompany, getCompanies } from '@/app/lib/companies';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};


export async function POST(req) {
    const data = await createCompany(req);
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
        const data = await getCompanies(req);
        if (data.error) {
          return NextResponse.json({ message: data.error }, { status: 500 });
        }
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }
}