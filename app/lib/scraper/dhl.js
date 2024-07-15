import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeDHLEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://group.dhl.com/en/investors/events/calendar.html';
    const { data } = await axios.get(url);
    
    // Parse the HTML
    const root = parse(data);
    
    // Extract main events
    const events = [];
    const currentDate = moment();

    // Select the events
    const eventItems = root.querySelectorAll('table.c-table--table tbody tr');
    
    eventItems.forEach((item) => {
      const dateRangeText = item.querySelector('td:nth-child(1)').innerText.trim();
      const description = item.querySelector('td:nth-child(2)').innerText.trim();

      let startDate, endDate;
      let event = {description : description, url : url};

      // Handle date ranges and single dates
      if (dateRangeText.includes('–')) {
        const dateRangeParts = dateRangeText.split('–');
        const startDateText = dateRangeParts[0].trim();
        const endDateText = dateRangeParts[1].trim();
        
        // Extract the year from the end date
        const endYear = moment(endDateText, 'MMM D, YYYY').year();
        
        // Set the start date to include the extracted year
        startDate = moment(`${startDateText} ${endYear}`, 'MMM D YYYY').startOf('day');
        endDate = moment(endDateText, 'MMM D YYYY').startOf('day');
        event.endDate = endDate.format('YYYY-MM-DD');
      } else {
        startDate = moment(dateRangeText, 'MMM D, YYYY').startOf('day');
        endDate = startDate;
      }

      event.date = startDate.format('YYYY-MM-DD');


      // Only include future events
      if (startDate.isValid() && (endDate.isAfter(currentDate) || startDate.isSame(currentDate))) {
        events.push(event);
      }

    });

    return events;
  } catch (error) {
    console.error('Error scraping DHL events:', error);
    return [];
  }
}
