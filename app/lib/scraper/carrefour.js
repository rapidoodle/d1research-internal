import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeCarrefourEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://www.carrefour.com/en/finance';
    const response = await axios.get(url);
    const data = response.data; // Extract the HTML content as text

    // Parse the HTML
    const root = parse(data);

    // Select the events
    const events = [];
    const eventItems = root.querySelectorAll('swiper-slide > agenda-card');

    eventItems.forEach((item) => {
      const titleElement = item.getAttribute('title');
      const dateElement = item.getAttribute('date');

      if (titleElement && dateElement) {
        const description = titleElement.trim();
        const date = moment(dateElement, 'YYYY-MM-DDTHH:mm:ssZ'); // Parse date using moment

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

    return events;
  } catch (error) {
    console.error('Error scraping Carrefour events:', error);
    return [];
  }
}