import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeDeutscheTelekomEvents() {
    try {
        // Fetch the HTML content of the webpage
        const url = 'https://www.telekom.com/en/investor-relations/financial-calendar';
        const { data } = await axios.get(url);
        
        // Parse the HTML
        const root = parse(data);
        
        // Extract main events
        const events = [];
        const currentDate = moment();
    
    
        // Select the events
        const eventItems = root.querySelectorAll('.event-info');
    
        eventItems.forEach((item) => {
          const event = {};
          const dateMeta = item.querySelector('.meta p').textContent.trim();
          const description = item.querySelector('.hl').textContent.trim();
            
          // Parse date
          let startDate, endDate;
          if (dateMeta.includes(' - ')) {
            const dateRange = dateMeta.split(' - ');
            const startDateText = dateRange[0].trim();
            const startDatObject = startDateText.split('‑');
            const endDateText = dateRange[1].trim();
            const endDateObject = endDateText.split('‑');

            startDate = moment(new Date(`${startDatObject[2]}-${startDatObject[0]}-${startDatObject[1]}`), 'YYYY-MM-DD').startOf('day');
            endDate = moment(new Date(`${endDateObject[2]}-${endDateObject[0]}-${endDateObject[1]}`), 'YYYY-MM-DD').endOf('day');
            event.endDate = endDate.format('YYYY-MM-DD');
          } else {
            const startDateText = dateMeta.trim();
            const dateObject = startDateText.split('‑');
            startDate = moment(new Date(`${dateObject[2]}-${dateObject[0]}-${dateObject[1]}`), 'YYYY-MM-DD').startOf('day');
            endDate = startDate.endOf('day');
            // console.log(startDate, startDateText, dateObject);
          }
          
          // Only include future events
          if (startDate.isValid() && (endDate.isAfter(currentDate) || startDate.isSame(currentDate))){
            event.date = startDate.format('YYYY-MM-DD');
            event.description = description;
            event.url = url;

            events.push(event);
            }


        });
    
        return events;
      } catch (error) {
        console.error('Error scraping Telekom events:', error);
        return [];
      }
}
