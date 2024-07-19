import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeAdidasEvents() {
  try {
    // Fetch the HTML content of the webpage
    const url = 'https://www.adidas-group.com/en/investors/financial-calendar';
    const data = await fetch(url).then((res) => res.text()).catch((error) => {
      console.error('Error fetching Adidas events:', error);
      return '';
    });

    // // Parse the HTML
    const root = parse(data);

    // Select the events
    const currentDate = moment();
    const events = [];
    const eventItems = root.querySelectorAll('article > div > div > div > div > div');

    eventItems.forEach((item) => {
      const dateElement = item.querySelector('h2');
      const descriptionElement = item.querySelector('h4');

      if (dateElement && descriptionElement) {

        const dateText = dateElement.text.trim();
        const description = descriptionElement.text.trim();

        let startDate, endDate;
        let event = {description : description, url : url};

        console.log(dateText);
        if (dateText.includes(' - ')) {
            const dateRangeParts = dateText.split(' - ');
            const startDateText = dateRangeParts[0].trim();
            const endDateText = dateRangeParts[1].trim();
            
            // Extract the year from the end date
            const endYear = moment(endDateText, 'MMM D, YYYY').year();
            
            // Set the start date to include the extracted year
            startDate = moment(`${startDateText} ${endYear}`, 'MMM D YYYY').startOf('day');
            endDate = moment(endDateText, 'MMM D YYYY').startOf('day');
            event.endDate = endDate.format('YYYY-MM-DD');
          } else {
            startDate = moment(dateText, 'MMM D, YYYY').startOf('day');
            endDate = startDate;
          }

          event.date = startDate.format('YYYY-MM-DD');

        // Only include future events
        if (startDate.isValid() && (endDate.isAfter(currentDate) || startDate.isSame(currentDate))) {
            events.push(event);
        }
      }
    });
    
    return events;
  } catch (error) {
    console.error('Error scraping Adidas events:', error);
    return [];
  }
}
