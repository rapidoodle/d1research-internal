import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

export async function scrapeIberdrolaEvents() {
    try {
      // Fetch the HTML content of the webpage
      const { data } = await axios.get('https://www.iberdrola.com/shareholders-investors/shareholders/shareholders-investors-calendar');
      
      // Parse the HTML
      const root = parse(data);
      
      // Extract main events
      const events = [];
  
      // Select the events
      const eventItems = root.querySelectorAll('ul.col-sm-12 > li');

      console.log(eventItems)
    //   eventItems.forEach((item) => {
    //     // Extract start date
    //     const startDateText = item.querySelector('.fecha .colIzq')?.innerText.trim();
    //     const endDateText = item.querySelector('.fechaFin .colDer')?.innerText.trim();
    //     const endMonthText = item.querySelector('.fechaFin .colDerec')?.innerText.trim();
    //     let startDate, endDate;
  
    //     // Handle date ranges and single dates
    //     if (startDateText && endDateText) {
    //       startDate = new Date(`${startDateText} ${endDateText} 2024`);
    //       endDate = new Date(`${endDateText} ${endMonthText} 2024`);
    //     } else if (startDateText) {
    //       startDate = new Date(`${startDateText} 2024`);
    //       endDate = startDate;
    //     }
  
    //     const description = item.querySelector('h3')?.innerText.trim();
    //     const details = item.querySelector('p')?.innerText.trim();
  
    //     // Only include future events
    //     const currentDate = new Date();
    //     if (startDate && startDate >= currentDate) {
    //       events.push({
    //         startDate: startDate.toISOString().split('T')[0],
    //         endDate: endDate.toISOString().split('T')[0],
    //         description,
    //         details
    //       });
    //     }
    //   });
  
      return events;
    } catch (error) {
      console.error('Error scraping Iberdrola events:', error);
      return [];
    }
}
