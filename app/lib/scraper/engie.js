import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeEngieEvents() {
    try {
    const url = 'https://www.engie.com/en/agenda'
      const response = await axios.get(url);
      const data = response.data;
  
      const root = parse(data);
      const events = [];
  
      const eventItems = root.querySelectorAll('.schedule-paragraph .schedule-item');
  
      eventItems.forEach((item) => {
        const dateElement = item.querySelector('.schedule-date time');
        const descriptionElement = item.querySelector('.schedule-text p');
        //   const description = descriptionElement.text.trim();
  
        // if (dateElement && descriptionElement) {
        if(dateElement){
            const dateText = new Date(dateElement?.getAttribute('datetime'));
            const date = moment(dateText).format('YYYY-MM-DD');
            const formattedDate = moment(date.replace(/-/g, '-')).format('YYYY-MM-DD');
            const finalDate = moment(formattedDate, 'YYYY-MM-DD');

            if(finalDate.isValid() && (finalDate.isAfter(moment()) || finalDate.isSame(moment()))){
                events.push({ date: date, description: descriptionElement, url: url });
            }
        }
      });

      return events;
    } catch (error) {
      console.error('Error scraping Engie events:', error);
      return [];
    }
  }