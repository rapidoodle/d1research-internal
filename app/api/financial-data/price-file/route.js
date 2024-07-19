import { uploadPriceFileData } from "@/app/lib/financial-data";
import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
  
    try {
      const fileUploadResponse = await uploadPriceFileData(req);
      return NextResponse.json({ message: 'File processed successfully' }, { status: 201 });
    } catch (error) {
      console.error('Error processing file:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }