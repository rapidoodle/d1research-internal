import axios from 'axios';
import moment from 'moment';

export async function scrapeAXAEvents() {
    try {
        // Fetch the JSON content from the API
        const url = 'https://www.axa.com/_api/events?audiences%5Baudiences.audience%5D=Vpz3WhsAADWYyOec&audiences%5Baudiences.audience%5D=Vie0NBwAAPEhi6Hu&audiences%5Baudiences.audience%5D=VkzBQB8AAEc90sZm&language=en&page=1&size=10&year=upcoming';
        const { data } = await axios.get(url);
        
        // Extract main events
        const events = [];

        const currentDate = moment();
        
        // Check if the response contains events
        data.items.forEach(eventItem => {
            const event = {};
            
            // Extract event details
            const startDate = moment(eventItem.eventTimeStart, 'YYYY-MM-DD');
            const endDate = moment(eventItem.eventTimeEnd, 'YYYY-MM-DD');
            const description = eventItem.title;

            console.log(startDate);

            // Only include future events
            if (startDate.isValid() && (endDate.isAfter(currentDate) || startDate.isSame(currentDate))) {
                event.date = startDate.format('YYYY-MM-DD');

                if(endDate.isAfter(startDate)) {
                    event.endDate = endDate.format('YYYY-MM-DD');
                }
                event.description = description;
                event.url = url;

                events.push(event);
            }
        });
        
        return events;
    } catch (error) {
        console.error('Error scraping AXA events:', error);
        return [];
    }
}