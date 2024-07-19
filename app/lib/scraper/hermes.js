import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeHermesEvents() {
  try {
    const response = await axios.get('https://finance.hermes.com/en/calendar/');
    const data = response.data;

    const root = parse(data);
    const eventItems = root.querySelectorAll('section.mb-24 ul > li');

    const events = [];
    const currentDate = moment();

    eventItems.forEach((item) => {
      const dateElement = item.querySelector('div > div > div > p > time');
      const descriptionElement = item.querySelector('h2');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.innerText.trim();
        const date = moment(dateText, 'MM.DD.YYYY').format('YYYY-MM-DD');
        const description = descriptionElement.innerText.trim();

        if (moment(date).isSameOrAfter(currentDate)) {
          events.push({ date, description, url: 'https://finance.hermes.com/en/calendar/' });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Hermès events:', error);
    return [];
  }
}