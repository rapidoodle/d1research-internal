import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeBayerEvents() {
    try {
        // Fetch the HTML content of the webpage
        const url = 'https://www.bayer.com/en/investors/events';
        const { data } = await axios.get(url);

        // Parse the HTML
        const root = parse(data);

        // Extract main events
        const events = [];
        const currentDate = moment();

        // Select the event rows
        const eventRows = root.querySelectorAll('.views-row');

        eventRows.forEach(row => {
            const event = {};
            const dateElement = row.querySelector('.views-field-field-date .datetime');
            const titleElement = row.querySelector('.views-field-title .field-content');

            if (dateElement && titleElement) {
                const dateText = dateElement.getAttribute('datetime');
                const description = titleElement.childNodes[0].text.trim();

                const startDate = moment(dateText);

                if (startDate.isValid() && (startDate.isAfter(currentDate) || startDate.isSame(currentDate))) {
                    event.date = startDate.format('YYYY-MM-DD');
                    event.description = description;
                    event.url = url;

                    events.push(event);
                }
            }
        });

        return events;
    } catch (error) {
        console.error('Error scraping Bayer events:', error);
        return [];
    }
}