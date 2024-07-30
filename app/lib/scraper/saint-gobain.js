import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeSaintGobainEvents() {
  try {
    const url = 'https://www.saint-gobain.com/en/finance/events-and-financial-results/calendar';
    const response = await fetch(url);
    const data = await response.text();

    const root = parse(data);
    const eventElements = root.querySelectorAll('.view-events .item-list ul li');
    const events = [];
    const currentDate = moment();

    eventElements.forEach(eventElement => {
      const dateElement = eventElement.querySelector('.event_date--starting');
      const descriptionElement = eventElement.querySelector('.field-title span');
      const summaryElement = eventElement.querySelector('.field-text-formatted');

      if (dateElement && descriptionElement && summaryElement) {
        const day = dateElement.querySelector('.event_day').text.trim();
        const month = dateElement.querySelector('.event_month').text.trim();
        const year = dateElement.querySelector('.event_year').text.trim();
        const dateText = `${day} ${month} ${year}`;
        const description = descriptionElement.text.trim();
        const formattedDate = moment(dateText, 'DD MMM YYYY').startOf('day');

        if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
          events.push({
            date: formattedDate.format('YYYY-MM-DD'),
            description: description,
            url: `https://www.saint-gobain.com${eventElement.querySelector('a').getAttribute('href')}`
          });
        }

        console.log(description, dateText);
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Saint-Gobain events:', error);
    return [];
  }
}