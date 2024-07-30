import axios from 'axios';
import moment from 'moment/moment';
import parse from 'node-html-parser';

export async function scrapeTotalEvents() {
    try {
      const url = 'https://totalenergies.com/news/calendar';
      const { data } = await axios.get(url);
      const root = parse(data);
      const events = [];
      const currentDate = moment().startOf('day');
  
      root.querySelectorAll('div.node-event').forEach(element => {
        const day = element.querySelector('.day')?.innerText.trim();
        const year = element.querySelector('.year')?.innerText.trim();
        let description = element.querySelector('.item-description span')?.innerText.trim();
        if(!description){
          description = element.querySelector('.item-description p')?.innerText.trim();
        }
        const dateText = `${day} ${year}`;
        const date = moment(dateText, 'MM/DD YYYY').startOf('day');

        console.log(description)
  
        if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
          events.push({ date: date.format('YYYY-MM-DD'), description, url : url });
        }
      });
  
      return events;
    } catch (error) {
      console.error('Error scraping Total Energies webpage:', error);
      return [];
    }
  }