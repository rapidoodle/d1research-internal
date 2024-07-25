import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeMichelinEvents() {
    try {
      const response = await fetch('https://www.michelin.com/en/events');
      const data = await response.text();
  
      const root = parse(data);
      const eventsData = root.querySelectorAll('.ds__card-event');
      const events = [];
      const currentDate = moment();
        
      eventsData.forEach(eventElement => {
        const dayElement = eventElement.querySelector('.ds__card-event-day');
        const monthYearElement = eventElement.querySelector('.ds__card-event-month-year span');
        const titleElement = eventElement.querySelector('.ds__card-event-title');
        
        if (dayElement && monthYearElement && titleElement) {
          const day = dayElement.innerText.trim();
          const monthYear = monthYearElement.innerText.trim();
          const title = titleElement.innerText.trim();
          
          const dateText = `${day} ${monthYear}`;
          const date = moment(dateText, 'DD MMM YYYY', 'en').format('YYYY-MM-DD');
          
          if (moment(date).isSameOrAfter(currentDate)) {
            events.push({ date, description: title, url: 'https://www.michelin.com/en/events' });
          }
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping Michelin events:', error);
      return [];
    }
  }