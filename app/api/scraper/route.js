import { scrapeEniEvents } from "@/app/lib/scraper/eni";
import { scrapeTotalEvents } from "@/app/lib/scraper/total";
import { scrapeVolkswagenEvents } from "@/app/lib/scraper/volkswagen";
import { NextResponse } from "next/server";

export async function GET(req) {
    //check if GET
    if(req.method !== 'GET') return NextResponse.methodNotAllowed();
    
    const { searchParams } = new URL(req.url);
    const site = searchParams.get('site');
    var data;
    try {
        console.log(req);

        switch (site) {
            case 'total':
                data = await scrapeTotalEvents();
                break;
            case 'eni':
                data = await scrapeEniEvents();
                break;
            case 'volkswagen':
                data = await scrapeVolkswagenEvents();
                break;
            default:
                throw new Error(`Unknown site: ${site}`);
        }
      if (data.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
      }
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error scraping data:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }