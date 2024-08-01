import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeUniCreditEvents() {
  try {

    //fetch post to get the data

    const response = await fetch('https://www.unicreditgroup.eu/archive.ucgn.calendararchivesearch.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }});
    
    const data = await response.json();

    console.log(data);

    const events = [];
    const currentDate = moment().format('YYYY-MM-DD');

    data.forEach((item) => {
        const date = moment(new Date(item.date), 'YYYY-MM-DD');
        const description = item.title;
        const url = item.url;
        
        console.log(date, currentDate);

        if(date.isSameOrAfter(currentDate)){
            events.push({date: date.format('YYYY-MM-DD'), description, url});
        }
    });

    return events;
  } catch (error) {
    console.error('Error scraping UniCredit events:', error);
    return [];
  }
}
