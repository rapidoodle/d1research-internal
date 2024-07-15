import axios from 'axios';
import moment from 'moment';
import parse from 'node-html-parser';

export async function scrapeAsmlEvents() {
    const url = 'https://tools.eurolandir.com/tools/fincalendar2/?companycode=nl-asml&lang=en-GB';

    try {
        // Fetch the HTML content of the webpage
        const { data } = await axios.get(url);
        const root = parse(data);

        // Extract the next event
        const nextEventSection = root.querySelector('section.next-event');
        const dateText = nextEventSection.querySelector('div.date-time')?.innerText.trim();
        const eventName = nextEventSection.querySelector('div.event-name')?.innerText.trim();

        // Parse date
        const date = moment(dateText, 'DD-MMM-YY');

        const nextEvent = [{
            date: date.isValid() ? date.format('YYYY-MM-DD') : 'Invalid Date',
            description: eventName || 'No event name available'
        }];

        return nextEvent;
    } catch (error) {
        console.error('Error scraping the webpage:', error);
        return null;
    }
}