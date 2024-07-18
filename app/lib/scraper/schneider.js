import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeSchneiderEvents() {
    try {
      // Fetch the HTML content of the webpage
      const url = 'https://www.se.com/ww/en/about-us/investor-relations/financial-calendar-and-events.jsp';
      const { data } = await axios.get(url);
      const root = parse(data);
  
      // Extract main events
      const events = [];
      const currentDate = moment();
  
      root.querySelectorAll('.table tbody tr').forEach(element => {
        const dateText = element.querySelector('.row-date').innerText.trim();
        const description = element.querySelectorAll('td')[1].innerText.trim();
  
        // Parse date
        const date = moment(dateText, 'MMMM D, YYYY');
  
        // Only include future events
        if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
          events.push({ date: date.format('YYYY-MM-DD'), description, url : url });
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping Schneider webpage:', error);
      return [];
    }
  }