import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

const url = 'https://investors.societegenerale.com/en';

export async function scrapeSocieteGeneraleEvents() {
  try {
    const { data } = await axios.get(url);
    const root = parse(data);

    const events = [];
    const currentDate = moment().startOf('day');

    root.querySelectorAll('.swiper-slide').forEach((item) => {
      const day = item.querySelector('.modal-event-day')?.text.trim();
      const month = item.querySelector('.modal-event-month')?.text.trim();
      const year = item.querySelector('.modal-event-year')?.text.trim();
      const description = item.querySelector('.modal-event-title')?.text.trim();

      if (day && month && year && description) {
        const dateText = `${day} ${month} ${year}`;
        const date = moment(dateText, 'DD MMM YYYY').startOf('day');

        if (date.isSameOrAfter(currentDate)) {
          events.push({
            date: date.format('YYYY-MM-DD'),
            description,
            url,
          });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Société Générale events:', error);
    return [];
  }
}