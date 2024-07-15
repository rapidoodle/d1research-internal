import axios from 'axios';
import moment from 'moment';
import parse from 'node-html-parser';

export async function scrapeEnelEvents() {
    try {
      // Fetch the HTML content of the webpage
      const { data } = await axios.get('https://www.enel.com/investors/financials');
      
      // Parse the HTML
      const root = parse(data);
      
      // Extract main events
      const events = [];
      const currentDate = moment();
  
      // Select the events
      const eventItems = root.querySelectorAll('.CalendarModuleItem');
      
      eventItems.forEach((item) => {
        const month = item.querySelector('.date span:nth-child(1)').text.trim();
        const day = item.querySelector('.date span:nth-child(2)').text.trim().replace(',', '');
        const year = item.querySelector('.date .year').text.trim();
        const description = item.querySelector('.copy p').text.trim();
        
        // Format date
        const dateText = `${month} ${day} ${year}`;
        const date = moment(dateText, 'MMMM D YYYY');
  
        // Only include future events
        if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
          events.push({ date: date.format('YYYY-MM-DD'), description: description, url: 'https://www.enel.com/investors/financials' });
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping Enel events:', error);
      return [];
    }
  }