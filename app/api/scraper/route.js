import { getCompanyByName } from "@/app/lib/companies";
import { createEvent, getEventByDateAndDescription } from "@/app/lib/events";
import { scrapeAdidasEvents } from "@/app/lib/scraper/adidas";
import { scrapeAirLiquideEvents } from "@/app/lib/scraper/air-liquide";
import { scrapeAirbusEvents } from "@/app/lib/scraper/airbus";
import { scrapeArcelorMittalEvents } from "@/app/lib/scraper/arcelormittal";
import { scrapeAsmlEvents } from "@/app/lib/scraper/asml";
import { scrapeBASFEvents } from "@/app/lib/scraper/basf";
import { scrapeBMWEvents } from "@/app/lib/scraper/bmw";
import { scrapeBouyguesEvents } from "@/app/lib/scraper/bouygues";
import { scrapeCapgeminiEvents } from "@/app/lib/scraper/capgemini";
import { scrapeCarrefourEvents } from "@/app/lib/scraper/carrefour";
import { scrapeDanoneEvents } from "@/app/lib/scraper/danone";
import { scrapeDassaultEvents } from "@/app/lib/scraper/dassault";
import { scrapeDeutscheTelekomEvents } from "@/app/lib/scraper/deutsche-telekom";
import { scrapeDHLEvents } from "@/app/lib/scraper/dhl";
import { scrapeEnelEvents } from "@/app/lib/scraper/enel";
import { scrapeEngieEvents } from "@/app/lib/scraper/engie";
import { scrapeEniEvents } from "@/app/lib/scraper/eni";
import { scrapeEssilorLuxotticaEvents } from "@/app/lib/scraper/essilorluxotica";
import { scrapeEurofinsEvents } from "@/app/lib/scraper/eurofins";
import { scrapeFerrariEvents } from "@/app/lib/scraper/ferrari";
import { scrapeHermesEvents } from "@/app/lib/scraper/hermes";
import { scrapeIberdrolaEvents } from "@/app/lib/scraper/iberdrola";
import { scrapeInditexEvents } from "@/app/lib/scraper/inditex";
import { scrapeInfineonEvents } from "@/app/lib/scraper/infineon";
import { scrapeKeringEvents } from "@/app/lib/scraper/kering";
import { scrapeMercedesEvents } from "@/app/lib/scraper/mercedes";
import { scrapeSAPEvents } from "@/app/lib/scraper/sap";
import { scrapeSchneiderEvents } from "@/app/lib/scraper/schneider";
import { scrapeStellantisEvents } from "@/app/lib/scraper/stellantis";
import { scrapeTotalEvents } from "@/app/lib/scraper/total";
import { scrapeVolkswagenEvents } from "@/app/lib/scraper/volkswagen";
import { NextResponse } from "next/server";
import { scrapeLegrandEvents } from "../../lib/scraper/legrand";
import { scrapeLorealEvents } from "@/app/lib/scraper/loreal";
import { scrapeMichelinEvents } from "@/app/lib/scraper/michelin";
import { scrapeNokiaEvents } from "@/app/lib/scraper/nokia";
import { scrapeOrangeEvents } from "@/app/lib/scraper/orange";
import { scrapeRenaultEvents } from "../../lib/scraper/renault";
import { scrapeSafranEvents } from "@/app/lib/scraper/safran";
import { scrapeShellEvents } from "@/app/lib/scraper/shell";
import { scrapeSaintGobainEvents } from "@/app/lib/scraper/saint-gobain";
import { scrapeTeleperformanceEvents } from "@/app/lib/scraper/teleperformance";
import { scrapeVeoliaEvents } from "@/app/lib/scraper/veolia";
import { scrapeVinciEvents } from "@/app/lib/scraper/vinci";
import { scrapeLVMHEvents } from "@/app/lib/scraper/lvmh";
import { scrapeLufthansaEvents } from "@/app/lib/scraper/lufthansa";
import { scrapeAholdEvents } from "@/app/lib/scraper/ahold";
import { scrapePorscheEvents } from "@/app/lib/scraper/porsche";
import { scrapeEdenredEvents } from "@/app/lib/scraper/edenred";
import { scrapeBnpEvents } from "@/app/lib/scraper/bnp";
import { scrapeCreditAgricoleEvents } from "@/app/lib/scraper/credit-agricole";
import { scrapeSocieteGeneraleEvents } from "@/app/lib/scraper/societe-generale";
import { scrapeIntesaSanpaoloEvents } from "@/app/lib/scraper/intesa";
import { scrapeUniCreditEvents } from "@/app/lib/scraper/unicredit";
import { scrapeSantanderEvents } from "@/app/lib/scraper/santander";
import { scrapeINGEvents } from "@/app/lib/scraper/ing";
import { scrapeBBVAEvents } from "@/app/lib/scraper/bbva";

export const maxDuration = 300;

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
            case 'deutsche-telekom':
                scrapedData = await scrapeDeutscheTelekomEvents();
                break;
            case 'adidas':
                scrapedData = await scrapeAdidasEvents();
                break;
            case 'air-liquide':
                scrapedData = await scrapeAirLiquideEvents();
                break;
            case 'airbus':
                scrapedData = await scrapeAirbusEvents();
                break;
            case 'arcelormittal':
                scrapedData = await scrapeArcelorMittalEvents();
                break;
            case 'bouygues':
                scrapedData = await scrapeBouyguesEvents();
                break;
            case 'capgemini':
                scrapedData = await scrapeCapgeminiEvents();
                break;
            case 'carrefour':
                scrapedData = await scrapeCarrefourEvents();
                break;
            case 'danone':
                scrapedData = await scrapeDanoneEvents();
                break;
            case 'dassault':
                scrapedData = await scrapeDassaultEvents();
                break;
            case 'engie':
                scrapedData = await scrapeEngieEvents();
                break;
            case 'essilorluxotica':
                scrapedData = await scrapeEssilorLuxotticaEvents();
                break;
            case 'ferrari':
                scrapedData = await scrapeFerrariEvents();
                break;
            case 'hermes':
                scrapedData = await scrapeHermesEvents();
                break;
            case 'eurofins':
                scrapedData = await scrapeEurofinsEvents();
                break;
            case 'inditex':
                scrapedData = await scrapeInditexEvents();
                break;
            case 'infeneon':
                scrapedData = await scrapeInfineonEvents();
                break;
            case 'legrand':
                scrapedData = await scrapeLegrandEvents();
                break;
            case 'loreal':
                scrapedData = await scrapeLorealEvents();
                break;
            case 'michelin':
                scrapedData = await scrapeMichelinEvents();
                break;
            case 'nokia':
                scrapedData = await scrapeNokiaEvents();
                break;
            case 'orange':
                scrapedData = await scrapeOrangeEvents();
                break;
            case 'renault':
                scrapedData = await scrapeRenaultEvents();
                break;
            case 'safran':
                scrapedData = await scrapeSafranEvents();
                break;
            case 'shell':
                scrapedData = await scrapeShellEvents();
                break;
            case 'st-gobain':
                scrapedData = await scrapeSaintGobainEvents();
                break;
            case 'teleperformance':
                scrapedData = await scrapeTeleperformanceEvents();
                break;
            case 'veolia':
                scrapedData = await scrapeVeoliaEvents();
                break;
            case 'vinci':
                scrapedData = await scrapeVinciEvents();
                break;
            case 'lvmh':
                scrapedData = await scrapeLVMHEvents();
                break;
            case 'lufthansa':
                scrapedData = await scrapeLufthansaEvents();
                break;
            case 'ahold':
                scrapedData = await scrapeAholdEvents();
                break;
            case 'porsche':
                scrapedData = await scrapePorscheEvents();
                break;
            case 'edenred':
                scrapedData = await scrapeEdenredEvents();
                break;
            case 'bnp':
                scrapedData = await scrapeBnpEvents();
                break;
            case 'credit-agricole':
                scrapedData = await scrapeCreditAgricoleEvents();
                break;
            case 'societe-generale':
                scrapedData = await scrapeSocieteGeneraleEvents();
                break;
            case 'intesa':
                scrapedData = await scrapeIntesaSanpaoloEvents();
                break;
            case 'unicredit':
                scrapedData = await scrapeUniCreditEvents();
                break;
            case 'santander':
                scrapedData = await scrapeSantanderEvents();
                break;
            case 'ing':
                scrapedData = await scrapeINGEvents();
                break;
            case 'bbva':
                scrapedData = await scrapeBBVAEvents();
                break;
            default:
                throw new Error(`Unknown site: ${site}`);
        }
        
        const company = site.replace('-', ' ');
        const companyResponse = await getCompanyByName({'name' : company});

        if(!companyResponse?.data){
            console.error(`Company ${site} not found in the database or scraped data is empty.`);
            throw new Error(`Company ${site} not found in the database.`);
        }else if(scrapedData.length <= 0){
            console.error(`Company ${site} doesn't have any upcoming events.`);
        }else{
            const eventsPromises = scrapedData?.map(async event => {
                event.friendly_name  = `${companyResponse.data.equity_ticker} - ${event.description}`;
                //check if event already exists by date and description
                const eventResponse = await getEventByDateAndDescription(companyResponse.data.id, event.date, event.friendly_name);
                if(eventResponse.data === 0){
                    event.equity_ticker = companyResponse.data.equity_ticker;
                    event.company_id    = companyResponse.data.id;
                    event.name          = companyResponse.data.name;
                    event.tags          = companyResponse.data.tags;
                    event.description   = `<a target="_blank" href="${event.url}">Click here for more details</a>`;
                    event.c_description   = `<a target="_blank" href="${event.url}">Click here for more details</a>`;
                    
                    if(event.endDate){
                        event.end_date = event.endDate;
                    }

                    //save the event
                    return await createEvent(event, false);
                    
                }else{
                    console.log(`${companyResponse.data.equity_ticker} ${event.description} (${event.date}) already exists in the database.`);
                }
            });

            await Promise.all(eventsPromises);
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