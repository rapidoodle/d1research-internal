import axios from 'axios';
import moment from 'moment';
import parse from 'node-html-parser';

export async function scrapeAsmlEvents() {
    try {
        const response = await fetch('https://tools.eurolandir.com/tools/FinCalendar2/Home/UpcomingEvents?companyCode=nl-asml&eventTypeId=&lang=en-gb&selectedYear=&CurrentPage=1&RowPerPage=5&SortOrder=ASC');

        const data = await response.json();
        
        const events = [];

        const currentDate = moment().format('YYYY-MM-DD');

        data.events.forEach((item) => {
            const formattedDate = new Date(item.startDate);
            const date          = moment(formattedDate, 'YYYY-MM-DD').startOf('day');
            const cDate         = moment(currentDate, 'YYYY-MM-DD').startOf('day');
            const description   = item.title;

            if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
                events.push({ date: date.format('YYYY-MM-DD'), description: description, url : 'https://tools.eurolandir.com/tools/fincalendar2/?companycode=nl-asml&lang=en-GB' });
            }
        });

        return events;

    } catch (error) {
      console.error('Error scraping SAP events:', error);
      return [];
    }
}