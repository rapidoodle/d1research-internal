import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeINGEvents() {
  try {
    const response = await fetch('https://www.ing.com/Investors/Calendar.htm');
    const data = await response.text();

    const root = parse(data);
    const eventsList = root.querySelectorAll('.agenda-list li');

    const events = [];
    const currentDate = moment();

    eventsList.forEach((item) => {
      const dateElement = item.querySelector('time');
      const descriptionElement = item.querySelector('.agenda-title');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.getAttribute('datetime');
        const description = descriptionElement.innerText.trim();
        const date = moment(dateText, 'YYYY-MM-DD').startOf('day');

        if (date.isSameOrAfter(currentDate)) {
          events.push({
            date: date.format('YYYY-MM-DD'),
            description,
            url: 'https://www.ing.com/Investors/Calendar.htm'
          });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping ING events:', error);
    return [];
  }
}