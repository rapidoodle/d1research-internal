import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeBASFEvents() {
    try {
      const url = 'https://www.basf.com/global/en/investors/calendar-and-publications/calendar.html#%7B%220%22%3A%5B%5B%22year%22%2C%5B%22after%22%5D%5D%5D%7D';
      const { data } = await axios.get(url);
      const root = parse(data);
      const events = [];
      const currentDate = moment().startOf('day');
  
      root.querySelectorAll('.cmp-text ul li').forEach(element => {
        const dateText = element.querySelector('span').innerText.trim();
        const description = element.innerHTML.split('<br>')[1].trim();
        const date = moment(dateText, 'dddd, MMMM DD, YYYY').startOf('day');
  
        if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
          events.push({ date: date.format('YYYY-MM-DD'), description, url: url });
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping BASF webpage:', error);
      return [];
    }
  }