import axios from 'axios';
import moment from 'moment/moment';
import parse from 'node-html-parser';

export async function scrapeTotalEvents() {
    try {
      const { data } = await axios.get('https://totalenergies.com/news/calendar');
      const root = parse(data);
      const events = [];
      const currentDate = moment().startOf('day');
  
      root.querySelectorAll('div.node-event').forEach(element => {
        const day = element.querySelector('.day').innerText.trim();
        const year = element.querySelector('.year').innerText.trim();
        const description = element.querySelector('.item-description span').innerText.trim();
        const dateText = `${day} ${year}`;
        const date = moment(dateText, 'MM/DD YYYY').startOf('day');
  
        if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
          events.push({ date: date.format('MM/DD/YYYY'), description });
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping Total Energies webpage:', error);
      return [];
    }
  }