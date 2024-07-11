import axios from 'axios';
import moment from 'moment';
import parse from 'node-html-parser';
import { createEvent } from '../events';

export async function scrapeVolkswagenEvents() {
  try {
    const url = 'https://www.volkswagen-group.com/en/events';
    const { data } = await axios.get(url);
    const root = parse(data);
    const events = [];
    const currentDate = moment().startOf('day');

    root.querySelectorAll('.upcoming-appointment').forEach(element => {
      const day = element.querySelector('.upcoming-appointment--date-day').innerText.trim();
      const monthYear = element.querySelector('.upcoming-appointment--date-month-year').innerText.trim();
      const description = element.querySelector('.upcoming-appointment--title').innerText.trim();
      const dateText = `${day} ${monthYear}`;
      const eventDate = moment(dateText, 'DD MMM YYYY').startOf('day');

      if (eventDate.isValid() && (eventDate.isAfter(currentDate) || eventDate.isSame(currentDate))) {
        events.push({ date: eventDate.format('YYYY-MM-DD'), description, url : url });
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Volkswagen webpage:', error);
    return [];
  }
}