import { NextResponse } from 'next/server';
import { getPremiumDiscounts } from '@/app/lib/premium-discounts';


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
        const adResponse = await getPremiumDiscounts();
        if (adResponse.error) {
            return NextResponse.json({ message: adResponse.error }, { status: 500 });
        }

        return NextResponse.json(adResponse.data, { status: 200 });
    } catch (error) {

    console.error('Error fetching premium discounts:', error);
    return NextResponse.json({ message: 'Error fetching premium discounts' }, { status: 500 });
    }
}