import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeAirLiquideEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://www.airliquide.com/investors/events-calendar';
    const { data } = await axios.get(url);

    // Parse the HTML
    const root = parse(data);

    // Select the events
    const events = [];
    const eventItems = root.querySelectorAll('.node--view-mode-list-item');

    eventItems.forEach((item) => {
      const dayElement = item.querySelector('.day');
      const yearMonthElement = item.querySelector('.year');
      const titleElement = item.querySelector('.title-event-item');
      const categoryElement = item.querySelector('.category-event-item');

      if (dayElement && yearMonthElement && titleElement) {
        const day = dayElement.text.trim();
        const yearMonth = yearMonthElement.text.trim();
        const title = titleElement.text.trim();

        const date = moment(`${day} ${yearMonth}`, 'DD MMMM YYYY');

        console.log(date);
        
        if (date.isValid() && date.isAfter(moment())) {
            events.push({
                date: date.format('YYYY-MM-DD'),
                description: title,
                url: url,
            });
        }
      }
    });

    

    return events;
  } catch (error) {
    console.error('Error scraping Air Liquide events:', error);
    return [];
  }
}
