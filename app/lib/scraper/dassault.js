import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeDassaultEvents() {
  try {
    const url = 'https://investor.3ds.com/events-presentations/calendar';
    const response = await axios.get(url);

    const root = parse(response.data);

    const events = [];

    const currentDate = moment().startOf('day');

    const eventItems = root.querySelectorAll('article.ds-card');

    eventItems.forEach((item) => {
        const titleElement = item.querySelector('.field-nir-event-title > .field__item')?.rawText.trim();
        const dateElement = item.querySelector('.ds-card__info span')?.childNodes[1].rawText.trim();

        if(dateElement && titleElement){
            const formattedDate = moment(dateElement, 'MMM D, YYYY');

            console.log(dateElement, formattedDate);

            if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
                events.push({ date: formattedDate.format('YYYY-MM-DD'), description: titleElement, url: url });
            }

        }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Dassault events:', error);
    return [];
  }
}