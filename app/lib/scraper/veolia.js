import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeVeoliaEvents() {
  try {
    const url = 'https://www.veolia.com/en/veolia-group/finance';
    const response = await fetch(url);
    const data = await response.text();

    const root = parse(data);
    const eventElements = root.querySelectorAll('.wysiwyg p');
    const events = [];
    const currentDate = moment();

    eventElements.forEach(eventElement => {
      const textContent = eventElement.text.trim();
      const [dateText, description] = textContent.split(': ').map(item => item.trim());
      const formattedDate = moment(dateText, 'MMMM D, YYYY').startOf('day');

      if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
        events.push({
          date: formattedDate.format('YYYY-MM-DD'),
          description: description,
          url: url
        });

        console.log(description, dateText);
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Veolia events:', error);
    return [];
  }
}