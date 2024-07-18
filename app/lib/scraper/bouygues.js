import { parse } from 'node-html-parser';
import moment from 'moment';
import axios from 'axios';

export async function scrapeBouyguesEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://www.bouygues.com/en/calendar-contacts/';
    const response = await axios.get(url);
    // const data = await response.text(); // Extract the HTML content as text

    // Parse the HTML
    const root = parse(response.data);

    // Select the events
    const events = [];
    const eventItems = root.querySelectorAll('.posts-list .entry');

    eventItems.forEach((item) => {
      const dateElement = item.querySelector('.event__date');
      const descriptionElement = item.querySelector('.entry__title');

      if (dateElement && descriptionElement) {
        const day = dateElement.querySelector('.event__date--day').text.trim();
        const monthYear = dateElement.querySelector('.event__date--month-year').text.trim();
        const dateText = `${day} ${monthYear}`;
        const date = moment(dateText, 'DD MMMM YYYY'); // Parse date using moment
        const description = descriptionElement.text.trim();

        // Only include future events
        if (date.isValid() && date.isAfter(moment())) {
          events.push({
            date: date.format('YYYY-MM-DD'),
            description: description,
            url: url, // Add URL if needed
          });
        }
      }
    });

    console.log(eventItems);

    return events;
  } catch (error) {
    console.error('Error scraping Bouygues events:', error);
    return [];
  }
}
