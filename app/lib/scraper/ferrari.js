import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeFerrariEvents() {
  try {
    const response = await axios.get('https://www.ferrari.com/en-EN/corporate/financial-corporate-calendar');
    const data = response.data;

    const root = parse(data);
    const eventItems = root.querySelectorAll('.LinkAccordion__sections__37TRQGxt .LinkAccordion__row__1CsdAIPq');

    const events = [];
    const currentDate = moment();

    eventItems.forEach((item) => {
      const dateElement = item.querySelector('.LinkAccordion__label__1N0Rl0R3 span');
      const descriptionElement = item.querySelector('.BtnAction__text__2vvCUxFa, .Text__body__2R1A9INN');

      if (dateElement && descriptionElement) {
        const dateText = dateElement.innerText.trim();
        const date = moment(dateText, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const description = descriptionElement.innerText.trim();

        if (moment(date).isSameOrAfter(currentDate)) {
          events.push({ date, description, url: 'https://www.ferrari.com/en-EN/corporate/financial-corporate-calendar' });
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Ferrari events:', error);
    return [];
  }
}