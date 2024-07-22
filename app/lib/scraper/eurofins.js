import puppeteer from 'puppeteer';
import moment from 'moment';

export async function scrapeEurofinsEvents() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the initial page and agree to the Safe Harbor Statement
    await page.goto('https://www.eurofins.com/investors/corporate-timetable', { waitUntil: 'networkidle2' });
    await page.waitForSelector('a[onmousedown="getQueryVariable();"]');
    await page.click('a[onmousedown="getQueryVariable();"]');

    // Wait for the redirect to the timetable page
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Scrape the events from the table
    const events = await page.evaluate(() => {
        const events = [];
        const currentDate = new Date();

        document.querySelectorAll('table tbody tr').forEach(row => {
            const description = row.cells[0].innerText.trim();
            const dateText = row.cells[1].innerText.trim();
            const urlElement = row.cells[2].querySelector('a');

            // Parse date
            const date = new Date(dateText);
            if (date >= currentDate) {
                events.push({ date: date.toISOString().split('T')[0], description: description, url : 'https://www.eurofins.com/investors/corporate-timetable'});
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
