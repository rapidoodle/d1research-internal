import { NextResponse } from 'next/server';
import { getAllCompanies } from '@/app/lib/companies';
import { getFinancialDataByCompanyTicker } from '@/app/lib/financial-data';
import { getConsolidatedEstimates } from '@/app/lib/consolidated-estimates';


export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};

export async function GET(req) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const cEResponse = await getConsolidatedEstimates();
        console.log(cEResponse);
        if (cEResponse.error) {
            return NextResponse.json({ message: cEResponse.error }, { status: 500 });
        }

    return NextResponse.json(cEResponse.data, { status: 200 });
    } catch (error) {

    console.error('Error fetching consolidated estimates:', error);
    return NextResponse.json({ message: 'consolidated estimates' }, { status: 500 });
    }
}