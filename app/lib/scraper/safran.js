import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeSafranEvents() {
  try {
    const url = 'https://www.safran-group.com/calendar?topics%5B0%5D=3000-finance';
    const response = await fetch(url);
    const data = await response.text();

    const root = parse(data);
    const eventElements = root.querySelectorAll('.c-event-card');
    const events = [];
    const currentDate = moment();

    eventElements.forEach(eventElement => {
      const day = eventElement.querySelector('.c-event-card__day').text.trim();
      const monthYear = eventElement.querySelector('.c-event-card__month-year').text.trim();
      const description = eventElement.querySelector('.c-event-card__event-title').text.trim();
      const eventUrl = eventElement.getAttribute('href');

      const dateText = `${day} ${monthYear}`;
      const formattedDate = moment(dateText, 'DD MMM YYYY'); // Adjust date format if necessary

      if (formattedDate.isSameOrAfter(currentDate)) {
        events.push({
          date: formattedDate.format('YYYY-MM-DD'), // Adjust the format as needed
          description,
          url: `${eventUrl}`,
        });
      }

      console.log(description, dateText);
    });

    return events;
  } catch (error) {
    console.error('Error scraping Safran events:', error);
    return [];
  }
}
