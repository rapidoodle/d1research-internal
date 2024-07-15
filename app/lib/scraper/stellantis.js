import axios from 'axios';
import moment from 'moment/moment';
import parse from 'node-html-parser';

export async function scrapeStellantisEvents() {
    try {
        // Fetch the HTML content of the webpage
        const url = 'https://www.stellantis.com/en/investors/events-and-presentations';
        const { data } = await axios.get(url);
        const root = parse(data);

        // Extract the most recent event
        const recentEventElement = root.querySelector('#banner-event0');
        const recentEventDateText = recentEventElement.querySelector('.banner-time-date').innerText.trim();
        const recentEventDescription = recentEventElement.querySelector('.event-description').innerText.trim();
        const recentEventTitle = recentEventElement.querySelector('.uptitle-event-banner').innerText.trim();

        // Parse the recent event date
        const recentEventDate = moment(recentEventDateText, 'dddd, MMMM D, YYYY [at] h:mm a ZZ');

        const recentEvent = {
            date: recentEventDate.isValid() ? recentEventDate.format('YYYY-MM-DD') : null,
            description: recentEventTitle,
            url: url,
        };

        // Extract upcoming events
        const events = [recentEvent];
        const upcomingEventElements = root.querySelectorAll('.upcoming-events .card');

        upcomingEventElements.forEach(eventElement => {
            const eventDateText = eventElement.querySelector('.card-dat-events').innerText.trim();
            const eventDescription = eventElement.querySelector('.card-text-events-p').innerText.trim();
            const eventTitle = eventElement.querySelector('.card-text-events-p').innerText.trim();

            // Parse the upcoming event date
            const eventDate = moment(eventDateText, 'MMMM D, YYYY');

            if (eventDate.isValid()) {
                events.push({
                    date: eventDate.format('YYYY-MM-DD'),
                    description: eventTitle,
                    url: url,
                });
            }
        });

        return events;

    } catch (error) {
        console.error('Error scraping Stellantis events:', error);
        return [];
    }
}