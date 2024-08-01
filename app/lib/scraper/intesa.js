import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

const url = 'https://www.intesasanpaolo.com/en/investor-relations/financial-calendar/2024.html';

async function fetchData(url, retries = 3) {
  try {
    const { data } = await axios.get(url, { timeout: 10000 });
    return data;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} attempts left)`);
      return fetchData(url, retries - 1);
    } else {
      throw error;
    }
  }
}

export async function scrapeIntesaSanpaoloEvents() {
  try {
    const data = await fetchData(url);
    const root = parse(data);

    const events = [];
    const currentDate = moment().startOf('day');

    root.querySelectorAll('.tab-row.section').forEach((item) => {
      const dateElement = item.querySelector('.tab-date .x-small-copy:nth-child(2)');
      const descriptionElement = item.querySelector('.tab-content.main-wysiwyg .bold');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.text.trim();
        const date = moment(dateText, 'DD/MM/YYYY').startOf('day');
        const description = descriptionElement.text.trim();

        if (date.isSameOrAfter(currentDate)) {
          events.push({
            date: date.format('YYYY-MM-DD'),
            description,
            url: 'https://www.intesasanpaolo.com/en/investor-relations/financial-calendar/2024.html'
          });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Intesa Sanpaolo events:', error);
    return [];
  }
}