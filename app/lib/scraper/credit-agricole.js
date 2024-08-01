import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeCreditAgricoleEvents() {
  try {
    const yearNow = moment().year();
    const url = `https://www.credit-agricole.com/en/calendar-events-load/85324/year/${yearNow}`;
    const response = await axios.post(url);
    const data = response.data;

    const root = parse(data);
    const eventItems = root.querySelectorAll('li');

    const events = [];
    const currentDate = moment().format('YYYY-MM-DD');

    root.querySelectorAll('li').forEach((item) => {
        const day = item.querySelector('.jour')?.text.trim();
        let month = item.querySelector('.mois')?.text.trim().replace('&nbsp;', '');
        const year = item.querySelector('.calend-container span:nth-child(3)')?.text.trim() || '2024'; // Default year if not found
        const description = item.querySelector('.content-calend h2')?.text.trim();
        
        if (day && month && year && description) {
          const dateText = `${day} ${month} ${year}`;
          const date = moment(dateText, 'DD MMM YYYY').format('YYYY-MM-DD');

          if (moment(date).isSameOrAfter(currentDate)) {
            events.push({
              date,
              description,
              url,
            });
          }
        }
      });

    return events;
  } catch (error) {
    console.error('Error scraping Credit Agricole events:', error);
    return [];
  }
}