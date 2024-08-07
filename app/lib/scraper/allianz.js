import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeAllianzEvents() {
    try {
        // Fetch the HTML content of the webpage
        const url = 'https://www.allianz.com/en/investor_relations/conferences-presentations/financial-calendar.html';
        const { data } = await axios.get(url);
        
        // Parse the HTML
        // const root = parse(data);

        console.log(data);
        
        // Extract main events
        const events = [];
        // const currentDate = moment();
    
        // // Select the events
        // const eventItems = root.querySelectorAll('.c-teaser-event');

        // eventItems.forEach((item) => {

        //     const event = {};
        //     const day = item.querySelector('.c-teaser-event__day').textContent.trim();
        //     const month = item.querySelector('.c-teaser-event__month').textContent.trim();
        //     const year = item.querySelector('.c-teaser-event__year').textContent.trim();
        //     const description = item.querySelector('.c-heading').textContent.trim();
            
        //     console.log(day);

        //     // Parse date
        //     const startDate = moment(`${year}-${month}-${day}`, 'YYYY-MMM-DD').startOf('day');
            
        //     // Only include future events
        //     if (startDate.isValid() && startDate.isSameOrAfter(currentDate)) {
        //         event.date = startDate.format('YYYY-MM-DD');
        //         event.description = description;
        //         event.url = url;

        //         events.push(event);
        //     }
        // });
    
        return events;
    } catch (error) {
        console.error('Error scraping Allianz events:', error);
        return [];
    }
}