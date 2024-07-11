import { getCompanyByName } from "@/app/lib/companies";
import { createEvent, getEventByDateAndDescription } from "@/app/lib/events";
import { scrapeBASFEvents } from "@/app/lib/scraper/basf";
import { scrapeEniEvents } from "@/app/lib/scraper/eni";
import { scrapeSchneiderEvents } from "@/app/lib/scraper/schneider";
import { scrapeTotalEvents } from "@/app/lib/scraper/total";
import { scrapeVolkswagenEvents } from "@/app/lib/scraper/volkswagen";
import { NextResponse } from "next/server";

export async function GET(req) {
    //check if GET
    if(req.method !== 'GET') return NextResponse.methodNotAllowed();
    
    const { searchParams } = new URL(req.url);
    const site = searchParams.get('site');
    var scrapedData = [];
    try {
        switch (site) {
            case 'total':
                scrapedData = await scrapeTotalEvents();
                break;
            case 'eni':
                scrapedData = await scrapeEniEvents();
                break;
            case 'vw':
                scrapedData = await scrapeVolkswagenEvents();
                break;
            case 'basf':
                scrapedData = await scrapeBASFEvents();
                break;
            case 'schneider':
                scrapedData = await scrapeSchneiderEvents();
                break;
            default:
                throw new Error(`Unknown site: ${site}`);
        }

        //save the scraped data to events table
        const companyResponse = await getCompanyByName({'name' : site});
        if(companyResponse){
            scrapedData.forEach(async event => {

                //check if event already exists by date and description
                const eventResponse = await getEventByDateAndDescription(companyResponse.data.id, event.date, event.description);
                if(eventResponse.data === 0){
                    event.equity_ticker = companyResponse.data.equity_ticker;
                    event.company_id    = companyResponse.data.id;
                    event.name          = companyResponse.data.name;
                    event.tags          = companyResponse.data.tags;
                    event.c_description   = `<a target="_blank" href="${event.url}">Click here to view more details</a>`;
    
                    const eventsResponse = await createEvent(event, false);
                    console.log(eventsResponse);
                }else{
                    console.log(`${event.description} already exists in the database.`);
                }
                
            });
        }
        // const eventsResponse = await createEvent(data, false);

      if (scrapedData.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
      }
      return NextResponse.json(scrapedData);
    } catch (error) {
      console.error('Error scraping data:', error);
      return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
  }