import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeArcelorMittalEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://corporate.arcelormittal.com/investors/financial-calendar'
    const response = await fetch(url);
    const data = await response.text(); // Extract the HTML content as text

    // Parse the HTML
    const root = parse(data);

    // Select the events
    const events = [];
    const eventItems = root.querySelectorAll('calendar-event');

    eventItems.forEach((item) => {
        // Extract the JSON data from the rawAttrs
        const rawAttrs = item.rawAttrs;
        const dataAttrMatch = rawAttrs.match(/:data='(.+?)'/);
  
        if (dataAttrMatch) {
          const jsonData = JSON.parse(dataAttrMatch[1].replace(/&quot;/g, '"'));
  
          const dateText = `${jsonData.day} ${jsonData.month} ${jsonData.year}`;
          const description = jsonData.heading;
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
    console.error('Error scraping ArcelorMittal events:', error);
    return [];
  }
}