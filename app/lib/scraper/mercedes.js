import axios from 'axios';
import moment from 'moment';
import parse from 'node-html-parser';

export async function scrapeMercedesEvents() {
    const url = 'https://group.mercedes-benz.com/investors/events/';
    
    try {
        // Fetch the HTML content of the webpage
        const { data } = await axios.get(url);
        const root = parse(data);
        
        // Extract main events
        const events = [];
        const currentDate = moment();
        
        root.querySelectorAll('li.teaser-list__item').forEach(element => {
            const day = element.querySelector('.event-teaser__date--day').innerText.trim();
            const month = element.querySelector('.event-teaser__date--month').innerText.trim();
            const year = element.querySelector('.event-teaser__date--year').innerText.trim();
            const title = element.querySelector('.event-teaser__title').innerText.trim();
            
            // Combine date parts and parse date
            const dateText = `${day} ${month} ${year}`;
            const date = moment(dateText, 'DD MMM YYYY');
            
            // Only include future events
            if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
                events.push({
                    date: date.format('YYYY-MM-DD'),
                    description: title,
                    url: url
                });
            }
        });
        
        return events;
    } catch (error) {
        console.error('Error scraping the webpage:', error);
        return [];
    }
}