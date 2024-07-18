import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeAirbusEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://www.airbus.com/en/investors/upcoming-events-presentations';
    const response = await fetch(url);
    const data = await response.text(); // Extract the HTML content as text

    // Parse the HTML
    const root = parse(data);

    // Select the events
    const events = [];
    const eventItems = root.querySelectorAll('section.global-cs table tr');

    eventItems.forEach((item) => {
      const descriptionElement = item.querySelector('td p:nth-child(1)');
      const dateElement = item.querySelector('td:last-child');

      if (descriptionElement && dateElement) {
        const description = descriptionElement.text.trim();
        const dateText = dateElement.text.trim();
        const date = moment(dateText, 'DD MMMM YYYY'); // Parse date using moment

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
    console.error('Error scraping Airbus events:', error);
    return [];
  }
}
