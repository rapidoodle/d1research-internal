import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeLorealEvents() {
  try {
    const response = await fetch('https://www.loreal-finance.com/eng/calendar');
    const data = await response.text();

    const root = parse(data);
    const eventsData = root.querySelectorAll('.views-row');
    const events = [];
    const currentDate = moment();

    eventsData.forEach(eventElement => {
      const titleElement = eventElement.querySelector('.calendar-list__title span');
      const dateElements = eventElement.querySelectorAll('.calendar-list__date');

      if (titleElement && dateElements.length) {
        const title = titleElement.innerText.trim();
        
        const startDateElement = dateElements[0];
        const startDay = startDateElement.querySelector('.calendar-list__day').innerText.trim();
        const startMonthYear = startDateElement.querySelector('.calendar-list__month-year').innerText.trim();
        const startDateText = `${startDay} ${startMonthYear}`;
        const startDate = moment(startDateText, 'DD MMMM YYYY', 'en').format('YYYY-MM-DD');
        
        let endDate;
        if (dateElements.length > 1) {
          const endDateElement = dateElements[1];
          const endDay = endDateElement.querySelector('.calendar-list__day').innerText.trim();
          const endMonth = endDateElement.querySelector('.calendar-list__month').innerText.trim();
          const endYear = endDateElement.querySelector('.calendar-list__year').innerText.trim();
          const endDateText = `${endDay} ${endMonth} ${endYear}`;
          endDate = moment(endDateText, 'DD MMMM YYYY', 'en').format('YYYY-MM-DD');
        }

        if (moment(startDate).isSameOrAfter(currentDate)) {
          const event = { date: startDate, description: title, url: 'https://www.loreal-finance.com/eng/calendar' };
          if (endDate) {
            event.endDate = endDate;
          }
          events.push(event);
        }
      }
    });

    return events;
  } catch (error) {
    throw error('Error scraping L\'Oreal events:', error);
  }
}