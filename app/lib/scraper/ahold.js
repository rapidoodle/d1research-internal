import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeAholdEvents() {
  try {
    const url = 'https://www.aholddelhaize.com/investors/events/2024/#investors-content';
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);

    const events = [];
    const currentDate = moment();

    // Find the year from the header
    const yearHeader = root.querySelector('.key-dates header p');
    const year = yearHeader ? parseInt(yearHeader.innerText.trim().match(/\d{4}/)[0]) : new Date().getFullYear();

    // Select all list items containing events
    const items = root.querySelectorAll('.key-date__list li');

    items.forEach(item => {
      const dateElement = item.querySelector('.text-center');
      const descriptionElement = item.querySelector('.inline-block');

      if (dateElement && descriptionElement) {
        const day = dateElement.querySelector('p.text-2xl').innerText.trim();
        const month = dateElement.querySelector('p.text-sm').innerText.trim();
        const descriptionParts = descriptionElement.querySelectorAll('p.text-avocado-b, p.text-rosemary-b');
        const description = descriptionParts.map(desc => desc.innerText.trim()).join(' - ');

        console.log(descriptionParts[1]);
        
        const dateText = `${day} ${month} ${year}`;
        const formattedDate = moment(dateText, 'DD MMM YYYY');

        if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
          events.push({
            date: formattedDate.format('YYYY-MM-DD'),
            description,
            url: url
          });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Ahold Delhaize events:', error);
    return [];
  }
}