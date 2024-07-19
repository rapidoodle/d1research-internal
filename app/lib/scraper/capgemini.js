import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeCapgeminiEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://investors.capgemini.com/en/calendar/';
    const response = await axios.get(url);
    const data = response.data; // Extract the HTML content as text

    // Parse the HTML
    const root = parse(data);

    // Select the events
    const events = [];
    const currentDate = moment();
    const eventItems = root.querySelectorAll('.card.card--calendar.card--horizontal');

    eventItems.forEach((item) => {
      const dateDayElement = item.querySelector('.card-calendar-day');
      const dateYearElement = item.querySelector('.card-calendar-year');
      const titleElement = item.querySelector('.card-title');
      const timeElement = item.querySelector('.card-date-time');

    const dateText = `${dateDayElement.text.trim()} ${dateYearElement.text.trim()}`;
    const date = moment(dateText, 'MMM DD YYYY'); // Parse date using moment

    const description = titleElement.text.trim();
    const time = timeElement ? timeElement.text.trim() : '';
    
    if(date.isValid() && date.isAfter(currentDate)){
        events.push({
        date: date.format('YYYY-MM-DD'),
        description: description,
        time: time,
        url: url, // Add URL if needed
        });
    }

    });
    return events;
  } catch (error) {
    console.error('Error scraping Capgemini events:', error);
    return [];
  }
}
