import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeLufthansaEvents() {
  try {
    const url = 'https://investor-relations.lufthansagroup.com/en/events/financial-calendar.html';
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);

    const events = [];
    const currentDate = moment();

    // Select all table rows containing events
    const rows = root.querySelectorAll('.table tbody tr');

    rows.forEach(row => {
      const columns = row.querySelectorAll('td');
      if (columns.length >= 2) {
        const dateText = columns[0].innerText.trim();
        const descriptionText = columns[1].innerText.trim();

        if (dateText && descriptionText) {
          const formattedDate = moment(dateText, 'DD.MM.YY');
          if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
            events.push({
              date: formattedDate.format('YYYY-MM-DD'),
              description: descriptionText,
              url: url
            });
          }
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Lufthansa events:', error);
    return [];
  }
}