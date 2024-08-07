import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeSanofiEvents() {
    try {
        // Fetch the HTML content of the webpage
        const url = 'https://www.sanofi.com/en/investors/financial-results-and-events?eventlist-0818a50d-30c7-434f-904e-b1261ab9824b-tab=1&eventlist-past-tab=1';
        const { data } = await axios.get(url);

        // Parse the HTML
        const root = parse(data);

        // Extract main events
        const events = [];
        const currentDate = moment();

        // Select the event containers
        const eventContainers = root.querySelectorAll('.MuiGrid2-root');

        eventContainers.forEach(container => {
            const event = {};
            const dateElement = container.querySelector('.elements-ds-c1mue6');
            const titleElement = container.querySelector('.elements-ds-zn46rg');
            const timeElement = container.querySelector('.elements-ds-1c3hzgk');

            if (dateElement && titleElement && timeElement) {
                const day = dateElement.querySelector('.elements-ds-1glom1q').textContent.trim();
                const month = dateElement.querySelector('.elements-ds-18cl7jw').textContent.trim();
                const year = dateElement.querySelector('.MuiTypography-h5').textContent.trim();

                const startDateText = `${day} ${month} ${year}`;
                const startDate = moment(startDateText, 'DD MMM YYYY').startOf('day');

                if (startDate.isValid() && (startDate.isAfter(currentDate) || startDate.isSame(currentDate))) {
                    event.date = startDate.format('YYYY-MM-DD');
                    event.description = titleElement.textContent.trim();
                    event.time = timeElement.textContent.trim();
                    event.url = url;

                    events.push(event);
                }
            }
        });

        return events;
    } catch (error) {
        console.error('Error scraping Sanofi events:', error);
        return [];
    }
}