import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeEdenredEvents() {
  try {
    const response = await axios.get('https://www.edenred.com/en/investors-shareholders/calendar');
    const data = response.data;

    const root = parse(data);
    const rows = root.querySelectorAll('table tbody tr');

    const events = [];
    const currentDate = moment();

    rows.forEach((row) => {
      const dateElement = row.querySelector('td:nth-child(1) div span.title-color--emerald, td:nth-child(1) div strong');
      const descriptionElement = row.querySelector('td:nth-child(2) div span.title-color--emerald, td:nth-child(2) div');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.innerText.trim();
        const description = descriptionElement.innerText.trim();
        const date = moment(dateText, 'MMMM D, YYYY').format('YYYY-MM-DD');

        if (moment(date).isSameOrAfter(currentDate)) {
          events.push({ date, description, url: 'https://www.edenred.com/en/investors-shareholders/calendar' });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Edenred events:', error);
    return [];
  }
}