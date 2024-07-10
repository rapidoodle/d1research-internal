import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';

export async function scrapeEniEvents() {
    try {
      // Fetch the HTML content of the webpage
      const { data } = await axios.get('https://www.eni.com/en-IT/investors/financial-calendar.html');
      const $ = cheerio.load(data);
  
      // Extract main events
      const events = [];
      const currentDate = moment();
  
      $('div.slick-item').each((index, element) => {
        const dateText = $(element).find('.eni-h6').first().text().trim();
        const event = $(element).find('.eni-h6').last().text().trim();
        const description = $(element).find('a.eni-h6').text().trim();
  
        // Parse date
        const date = moment(dateText, 'DD MMM YYYY');
  
        // Only include future events
        if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
          events.push({ date: date.format('DD MMM YYYY'), event, description });
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping the webpage:', error);
      return [];
    }
  }