import axios from 'axios';
import moment from 'moment';
import parse from 'node-html-parser';

export async function scrapeEniEvents() {
    try {
      // Fetch the HTML content of the webpage
      const url = 'https://www.eni.com/en-IT/investors/financial-calendar.html';
      const { data } = await axios.get(url);
      const root = parse(data);
  
      // Extract main events
      const events = [];
      const currentDate = moment();
  
      root.querySelectorAll('div.slick-item').forEach(element => {
        const dateText = element.querySelector('.eni-h6').innerText.trim();
        const description = element.querySelector('a.eni-h6').innerText.trim();
  
        // Parse date
        const date = moment(dateText, 'DD MMM YYYY');
  
        // Only include future events
        if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
          events.push({ date: date.format('YYYY-MM-DD'), description, url : url });
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping the webpage:', error);
      return [];
    }
  }