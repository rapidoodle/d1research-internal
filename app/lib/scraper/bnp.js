import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeBnpEvents() {
  try {
    const response = await axios.get('https://invest.bnpparibas/en/agenda');
    const data = response.data;

    const root = parse(data);
    const eventItems = root.querySelectorAll('.section-events .block-event');

    const events = [];
    const currentDate = moment();

    eventItems.forEach((item) => {
      const day = item.querySelector('.event-date .day').innerText.trim();
      const month = item.querySelector('.event-date .month').innerText.trim();
      const year = item.querySelector('.event-date .year').innerText.trim();
      const descriptionElement = item.querySelector('.event-inner .title-5');

      if (day && month && year && descriptionElement) {
        const dateText = `${day} ${month} ${year}`;
        const date = moment(dateText, 'DD MMM YYYY').format('YYYY-MM-DD');
        const description = descriptionElement.innerText.trim();

        if (moment(date).isSameOrAfter(currentDate)) {
          events.push({ 
            date, 
            description, 
            url: 'https://invest.bnpparibas/en/agenda' 
          });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping BNP Paribas events:', error);
    return [];
  }
}