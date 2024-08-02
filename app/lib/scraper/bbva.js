import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeBBVAEvents() {
  try {
    const response = await axios.get('https://shareholdersandinvestors.bbva.com/financials/financial-calendar/');
    const data = response.data;

    const root = parse(data);
    const eventsList = root.querySelectorAll('.item-event');

    const events = [];
    const currentDate = moment();

    eventsList.forEach((item) => {
      const dateElement = item.querySelector('.data-event .dat');
      const descriptionElement = item.querySelector('.card-content .title26');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.innerText.trim().replace(/\s+/g, ' ');
        const date = moment(dateText, 'DD MMMM YYYY').startOf('day');
        const description = descriptionElement.innerText.trim();

        if (date.isSameOrAfter(currentDate)) {
          events.push({
            date: date.format('YYYY-MM-DD'),
            description,
            url: 'https://shareholdersandinvestors.bbva.com/financials/financial-calendar/'
          });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping BBVA events:', error);
    return [];
  }
}