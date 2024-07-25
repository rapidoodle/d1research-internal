import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeEssilorLuxotticaEvents() {
  try {
    const url = 'https://www.essilorluxottica.com/en/investors/financial-calendar/';
    const response = await axios.get(url);
    const data = response.data;

    const root = parse(data);
    const calendarSections = root.querySelectorAll('#CalendarEvents');
    const eventItems = calendarSections[1].querySelectorAll('div');
    const events = [];

    if (calendarSections.length < 2) {
        console.error('Second CalendarEvents section not found');
        return [];
    }

    eventItems.forEach((item) => {
      const dateElement = item.querySelector('.Text-sc-17891b10-0.hrkcXH[color="neutral.40"]');
      const descriptionElement = item.querySelector('.TextEllipsis-sc-85fee99a-0');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.innerText.trim().replace(/<!-- -->/g, '');
        const date = moment(dateText, 'DD MMM YYYY').format('YYYY-MM-DD');
        const description = descriptionElement.innerText.trim();

        events.push({ date, description, url: url });
      }
    });

    //remove with duplicate dates
    const uniqueEvents = events.filter((event, index, self) =>
      index === self.findIndex((e) => (
        e.date === event.date
      ))
    );
    

    return uniqueEvents;
  } catch (error) {
    console.error('Error scraping EssilorLuxottica events:', error);
    return [];
  }
}