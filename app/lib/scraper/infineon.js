import axios from 'axios';
import moment from 'moment';

export async function scrapeInfineonEvents() {
  try {
    const response = await fetch('https://www.infineon.com/cms/en/services/ajax/search/eventsUpcoming?term&offset=0&lang=en&max_results=10&filter_types=financial-calendar&parent_folder=/.content/')

    const jsonData = await response.json();
    const eventsData = jsonData.pages.items;

    const events = [];
    const currentDate = moment();

    eventsData.forEach(event => {
      const { event_start_date, event_date_formatted, title, event_end_date } = event;
      const description = title || 'No description available';

      const date = moment(event_start_date, 'YYYY-MM-DD').format('YYYY-MM-DD');

      if (moment(date).isSameOrAfter(currentDate)) {
        const event = { date: date, 
                        description: description, 
                        url: 'https://www.infineon.com/cms/en/about-infineon/investor/news-and-events/events2/'
                    };
        
        if(event_end_date){
          event.endDate = moment(event_end_date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        }

        events.push(event);
        
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Infineon events:', error);
    return [];
  }
}