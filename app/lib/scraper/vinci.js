import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeVinciEvents() {
  try {
    const url = 'https://www.vinci.com/vinci.nsf/en/investors-calendar/pages/index.htm';
    const response = await fetch(url);
    const data = await response.text();

    const root = parse(data);
    const yearElements = root.querySelectorAll('.subtext_main h2');
    const events = [];
    const currentDate = moment();

    yearElements.forEach(yearElement => {
      const year = yearElement.text.trim();
      let nextElement = yearElement.nextElementSibling;

      while (nextElement && nextElement.tagName === 'DIV' && nextElement.classList.contains('cal')) {
        const month = nextElement.querySelector('.cal-month').text.trim();
        const day = nextElement.querySelector('.cal-day').text.trim();
        const dateText = `${day} ${month} ${year}`;
        const formattedDate = moment(dateText, 'DD MMM YYYY').startOf('day');

        const descriptionElement = nextElement.querySelector('.cal-text strong');
        const description = descriptionElement ? descriptionElement.text.trim() : '';

        const eventUrlElement = nextElement.querySelector('.cal-abo a');
        const eventUrl = eventUrlElement ? `https://www.vinci.com${eventUrlElement.getAttribute('href')}` : '';

        if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
          events.push({
            date: formattedDate.format('YYYY-MM-DD'),
            description: description,
            url: eventUrl
          });
        }

        nextElement = nextElement.nextElementSibling;
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Vinci events:', error);
    return [];
  }
}