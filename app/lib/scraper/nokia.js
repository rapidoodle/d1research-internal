import { parse } from 'node-html-parser';
import moment from 'moment';
import axios from 'axios';

export async function scrapeNokiaEvents() {
  try {
    const response = await axios.get('https://nokia.gcs-web.com/upcoming-events');
    // const data = await response.text();

    const root = parse(response.data);
    const eventsData = root.querySelectorAll('tr.node--type-nir-event');
    const events = [];
    const currentDate = moment();
    
    eventsData.forEach(eventElement => {
      const titleElement = eventElement.querySelector('.field-nir-event-title .field__item a');
      const dateElement = eventElement.querySelector('.views-field-field-nir-event-start-date');

      if (titleElement && dateElement) {
        const title = titleElement.innerText.trim();
        const dateText = dateElement.innerText.trim();
        const date = moment(dateText, 'MMM DD, YYYY from h:mm A').format('YYYY-MM-DD');

        if (moment(date).isSameOrAfter(currentDate)) {
          events.push({ date, description: title, url: 'https://nokia.gcs-web.com/upcoming-events' });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Nokia events:', error);
    return [];
  }
}