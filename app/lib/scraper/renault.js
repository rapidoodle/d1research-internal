import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeRenaultEvents() {
  try {
    const url = 'https://www.renaultgroup.com/en/finance-2/contact/';
    const response = await fetch(url); // Replace with the actual URL if needed
    const data = await response.text();

    const root = parse(data);
    const eventElements = root.querySelectorAll('ul li');
    const events = [];
    const currentDate = moment();

    eventElements.forEach(eventElement => {
      const innerHTML = eventElement.innerHTML;
      const [description, date] = innerHTML.split('<br>').map(item => item.replace(/<\/?[^>]+(>|$)/g, "").trim());

      if (description && date) {
        const formattedDate = moment(date, 'dddd MMMM D, YYYY'); // Adjust date format if necessary
        if (formattedDate.isSameOrAfter(currentDate)) {
          events.push({
            date: formattedDate.format('YYYY-MM-DD'), // Adjust the format as needed
            description,
            url: url
          });
        }

        console.log(description, date);
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Renault events:', error);
    return [];
  }
}
