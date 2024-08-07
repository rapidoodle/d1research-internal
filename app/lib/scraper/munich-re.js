import axios from 'axios';
import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeMunichReEvents() {
    try {
        // Fetch the HTML content of the webpage
        const url = 'https://www.munichre.com/en/company/investors/event-calendar.html';
        const { data } = await axios.get(url);
        
        // Parse the HTML
        const root = parse(data);
        
        // Extract main events
        const events = [];
        const currentDate = moment();

        // Select the table rows
        const rows = root.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const event = {};
            const dateCell = row.querySelector('td:nth-child(1)').textContent.trim();
            const descriptionCell = row.querySelector('td:nth-child(2)').textContent.trim();

            // Parse date
            let startDate, endDate;
            if (dateCell.includes('/')) {
                const dateRange = dateCell.split('/');
                startDate = moment(dateRange[0].trim(), 'DD MMMM YYYY').startOf('day');
                endDate = moment(dateRange[1].trim(), 'DD MMMM YYYY').endOf('day');
                event.endDate = endDate.format('YYYY-MM-DD');
            } else {
                startDate = moment(dateCell, 'DD MMMM YYYY').startOf('day');
                endDate = startDate.endOf('day');
            }
            
            // Only include future events
            if (startDate.isValid() && (endDate.isAfter(currentDate) || startDate.isSame(currentDate))) {
                event.date = startDate.format('YYYY-MM-DD');
                event.description = descriptionCell;
                event.url = url;

                events.push(event);
            }
        });

        return events;
    } catch (error) {
        console.error('Error scraping Munich Re events:', error);
        return [];
    }
}