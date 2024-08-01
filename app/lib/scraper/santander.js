import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeSantanderEvents() {
  try {
    const url = 'https://www.santander.com/en/shareholders-and-investors';
    const response = await axios.get(url);
    const data = response.data;

    const root = parse(data);
    const events = [];
    const currentDate = moment();

    root.querySelectorAll('.events-items').forEach((item) => {
      const fromDateElement = item.querySelector('.fromDate');
      const toDateElement = item.querySelector('.toDate');
      const descriptionElement = item.querySelector('.events-description__title');

      if (fromDateElement && descriptionElement) {
        const fromDay = fromDateElement.querySelector('.events-date__day')?.innerText.trim();
        const fromMonth = fromDateElement.querySelector('.events-date__month')?.innerText.trim();
        const fromYear = fromDateElement.querySelector('.events-date__year')?.innerText.trim();
        const fromDateText = `${fromDay} ${fromMonth} ${fromYear}`;
        const fromDate = moment(fromDateText, 'DD MMM YYYY').startOf('day');

        let toDate;
        if (toDateElement) {
          const toDay = toDateElement.querySelector('.events-date__day')?.innerText.trim();
          const toMonth = toDateElement.querySelector('.events-date__month')?.innerText.trim();
          const toYear = toDateElement.querySelector('.events-date__year')?.innerText.trim();
          const toDateText = `${toDay} ${toMonth} ${toYear}`;
          toDate = moment(toDateText, 'DD MMM YYYY').startOf('day');
        }

        const description = descriptionElement.innerText.trim();

        if (fromDate.isSameOrAfter(currentDate)) {
            const event = {date : fromDate.format('YYYY-MM-DD'), description, url: url};

            if(toDate) {
                event.endDate = toDate.format('YYYY-MM-DD');
            }

            events.push(event);
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Santander events:', error);
    return [];
  }
}
