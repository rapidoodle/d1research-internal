import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';
import puppeteer from 'puppeteer';

export async function scrapeBMWEvents() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the page
    await page.goto('https://www.bmwgroup.com/en/investor-relations/corporate-events.html', { waitUntil: 'networkidle2' });

    // Open the dropdown
    await page.click('.grp-dropdown-button.grp-down button');
    await page.waitForSelector('.grp-dropdown-container');

    // Select "BMW Group Investor Relations"
    await page.evaluate(() => {
        document.querySelectorAll('.grp-dd-item').forEach(item => {
            if (item.innerText.includes('BMW Group Investor Relations')) {
                item.click();
            }
        });
    });

    // Wait for the events to load
    await page.waitForSelector('.grp-calendar-search-result');

    // Scrape the events
    const events = await page.evaluate(() => {
        const events = [];
        const currentDate = new Date();

        document.querySelectorAll('.grp-calendar-accordion-item').forEach(element => {
            const dateText = element.querySelector('.grp-calendar-accordion-date').innerText.trim();
            const description = element.querySelector('.grp-calendar-accordion-title').innerText.trim();

            // Parse date
            const [day, month, year] = dateText.split('.');
            const date = new Date(`${year}-${month}-${day}`);

            // Only include future events
            if (date >= currentDate) {
                events.push({ date: date.toISOString().split('T')[0], description, url: 'https://www.bmwgroup.com/en/investor-relations/corporate-events.html'});
            }
        });

        return events;
    });

    await browser.close();

    // Format dates with moment.js
    return events.map(event => ({
        ...event,
        date: moment(event.date).format('YYYY-MM-DD')
    }));
}

