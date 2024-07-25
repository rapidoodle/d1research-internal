import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeInditexEvents() {
  try {
    const response = await fetch('https://www.inditex.com/itxcomweb/en/investors/finance');
    const data = await response.text();

    const root = parse(data);
    const scriptTag = root.querySelector('#__NEXT_DATA__');

    if (!scriptTag) {
      throw new Error('Script tag with JSON data not found');
    }

    const jsonData = JSON.parse(scriptTag.text);

    const eventsData = jsonData.props.pageProps.page.pageContentFields;
    const events = [];
    const currentDate = moment();

    eventsData.map(event => {
        if(event.text && event.text.includes('Investor’s Agenda')){
            const eventHtml = event.text;
            const eventRoot = parse(eventHtml);
            const paragraphs = eventRoot.querySelectorAll('p');

            let currentYear = '';
        
            paragraphs.forEach(paragraph => {
              const text = paragraph.innerText.trim();
        
              if (text.match(/^\d{4}$/)) {
                // This is a year
                currentYear = text;
              } else if (currentYear && text.includes('/')) {
                // This is an event description
                const [dayMonth, description] = text.split(' / ');

                if (dayMonth && description && !text.toLowerCase().includes('(tbc)')) {
                  const [day, month] = dayMonth.split(' ');
        
                  if (day && month) {
                    const dateText = `${day} ${month} ${currentYear}`;
                    const date = moment(dateText, 'D MMMM YYYY', 'en').format('YYYY-MM-DD');
        
                    if (moment(date).isSameOrAfter(currentDate)) {
                      events.push({ date, description, url: 'https://www.inditex.com/itxcomweb/en/investors/finance' });
                    }
                  }
                }
              }
            });
        }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Inditex events:', error);
    return [];
  }
}