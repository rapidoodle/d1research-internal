import { getSensitivitiesData, getSensitivitiesDataByCompanyTicker, uploadSensitivitiesData } from "@/app/lib/sensitivities";
import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
  
    try {
      const fileUploadResponse = await uploadSensitivitiesData(req);

      if(!fileUploadResponse) {
        return NextResponse.json({ message: 'Please select a file first' }, { status: 400 });
      }

      return NextResponse.json({ message: 'Sensitivities processed successfully' }, { status: 201 });
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
    const equityTicker = searchParams.get('equity_ticker');
    const type         = searchParams.get('type');
    
    if(equityTicker) {
      try {
        const data = await getSensitivitiesDataByCompanyTicker(equityTicker);
        
        if (data.error) {
          return NextResponse.json({ message: data.error }, { status: 500 });
        }
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error fetching sensitivities data:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }
    }else{
    try {
        const fileUploadResponse = await getSensitivitiesData(req);
      
        if (fileUploadResponse.error) {
            return NextResponse.json({ message: fileUploadResponse.error }, { status: 500 });
        }

        return NextResponse.json(fileUploadResponse);

    } catch (error) {
        console.error('Error fetching sensitivities data:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
}
