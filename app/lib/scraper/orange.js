import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeOrangeEvents() {
  try {
    const response = await fetch('https://www.orange.com/en/financial-calendar'); // Replace with the actual URL if needed
    const data = await response.text();

    const root = parse(data);
    const eventElements = root.querySelectorAll('.obs_template .col-md-2.col-sm-12');
    const events = [];
    const currentDate = moment();

    eventElements.forEach(eventElement => {
      const dateElement = eventElement.querySelector('span strong');
      const descriptionElement = eventElement.querySelector('p');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.innerText.trim();
        const descriptionText = descriptionElement.innerText.replace(dateText, '').trim();
        const date = moment(dateText, 'DD MMMM YYYY').format('YYYY-MM-DD');

        if (moment(date).isSameOrAfter(currentDate)) {
          events.push({
            date,
            description: descriptionText,
            url: 'https://www.orange.com/en/financial-calendar'
          });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Orange events:', error);
    return [];
  }
}