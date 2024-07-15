import { getCompanyByName } from "@/app/lib/companies";
import { createEvent, getEventByDateAndDescription } from "@/app/lib/events";
import { scrapeAsmlEvents } from "@/app/lib/scraper/asml";
import { scrapeBASFEvents } from "@/app/lib/scraper/basf";
import { scrapeBMWEvents } from "@/app/lib/scraper/bmw";
import { scrapeDeutscheTelekomEvents } from "@/app/lib/scraper/deutsche-telekom";
import { scrapeDHLEvents } from "@/app/lib/scraper/dhl";
import { scrapeEnelEvents } from "@/app/lib/scraper/enel";
import { scrapeEniEvents } from "@/app/lib/scraper/eni";
import { scrapeIberdrolaEvents } from "@/app/lib/scraper/iberdrola";
import { scrapeKeringEvents } from "@/app/lib/scraper/kering";
import { scrapeMercedesEvents } from "@/app/lib/scraper/mercedes";
import { scrapeSAPEvents } from "@/app/lib/scraper/sap";
import { scrapeSchneiderEvents } from "@/app/lib/scraper/schneider";
import { scrapeStellantisEvents } from "@/app/lib/scraper/stellantis";
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
            case 'stellantis':
                scrapedData = await scrapeStellantisEvents();
                break;
            case 'enel':
                scrapedData = await scrapeEnelEvents();
                break;
            case 'bmw':
                scrapedData = await scrapeBMWEvents();
                break;
            case 'mercedes':
                scrapedData = await scrapeMercedesEvents();
                break;
            case 'asml':
                scrapedData = await scrapeAsmlEvents();
                break;
            case 'sap':
                scrapedData = await scrapeSAPEvents();
                break;
            case 'kering':
                scrapedData = await scrapeKeringEvents();
                break;
            case 'dhl':
                scrapedData = await scrapeDHLEvents();
                break;
            case 'iberdrola':
                scrapedData = await scrapeIberdrolaEvents();
                break;
            case 'deutsche telekom':
                scrapedData = await scrapeDeutscheTelekomEvents();
                break;
            default:
                throw new Error(`Unknown site: ${site}`);
        }

        //save the scraped data to events table
        const companyResponse = await getCompanyByName({'name' : site});
        if(companyResponse){
            scrapedData.forEach(async event => {
                event.friendly_name  = `${companyResponse.data.equity_ticker} - ${event.description}`;
                //check if event already exists by date and description
                const eventResponse = await getEventByDateAndDescription(companyResponse.data.id, event.date, event.friendly_name);
                if(eventResponse.data === 0){
                    event.equity_ticker = companyResponse.data.equity_ticker;
                    event.company_id    = companyResponse.data.id;
                    event.name          = companyResponse.data.name;
                    event.tags          = companyResponse.data.tags;
                    event.description   = `<a target="_blank" href="${event.url}">Click here to view more details</a>`;
                    event.c_description   = `<a target="_blank" href="${event.url}">Click here to view more details</a>`;
                    
                    if(event.endDate){
                        event.end_date = event.endDate;
                    }

                    //save the event
                    await createEvent(event, false);
                    
                }else{
                    console.log(companyResponse);
                    console.log(`${companyResponse.data.id} ${event.description} already exists in the database.`);
                }
            });
        }

      if (scrapedData.error) {
        return NextResponse.json({ message: data.error }, { status: 500 });
      }
      return NextResponse.json(scrapedData);
    } catch (error) {
      console.error('Error scraping data:', error);
      return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
  }