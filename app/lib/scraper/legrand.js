import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeLegrandEvents() {
  try {
    const response = await fetch('https://www.legrandgroup.com/en/investors-and-shareholders/financial-agenda');
    const data = await response.text();

    const root = parse(data);
    const eventsData = root.querySelectorAll('.block-agenda');
    const events = [];
    const currentDate = moment();

    eventsData.forEach(eventElement => {
      const titleElement = eventElement.querySelector('.module-content a h4');
      const dayElement = eventElement.querySelector('.day');
      const monthElement = eventElement.querySelector('.month');
      const yearElement = eventElement.querySelector('.year');

      if (titleElement && dayElement && monthElement && yearElement) {
        const title = titleElement.innerText.trim();
        const day = dayElement.innerText.trim();
        const month = monthElement.innerText.trim();
        const year = yearElement.innerText.trim();
        const dateText = `${day} ${month} ${year}`;
        const date = moment(dateText, 'DD MMMM YYYY', 'en').format('YYYY-MM-DD');

        if (moment(date).isSameOrAfter(currentDate)) {
          events.push({ date, description: title, url: 'https://www.legrandgroup.com/en/investors-and-shareholders/financial-agenda' });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Legrand events:', error);
    return [];
  }
}