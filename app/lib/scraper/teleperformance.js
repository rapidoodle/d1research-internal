import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeTeleperformanceEvents() {
  try {
    const url = 'https://www.teleperformance.com/en-us/investors/shareholder-information/investor-agenda/';
    const response = await fetch(url);
    const data = await response.text();

    const root = parse(data);
    const rows = root.querySelectorAll('table.table-style tbody tr');
    const events = [];
    const currentDate = moment();
    
    console.log(root);

    rows.forEach(row => {
      const dateElement = row.querySelector('td:nth-child(1) p');
      const descriptionElement = row.querySelector('td:nth-child(2) p');
      

      console.log(dateElement, descriptionElement);

      if (dateElement && descriptionElement) {
        const dateText = dateElement.text.trim();
        const description = descriptionElement.text.trim();
        const formattedDate = moment(dateText, 'MMMM D, YYYY').startOf('day');

        if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
          events.push({
            date: formattedDate.format('YYYY-MM-DD'),
            description: description,
            url: url
          });
        }

        console.log(description, dateText);
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Teleperformance events:', error);
    return [];
  }
}