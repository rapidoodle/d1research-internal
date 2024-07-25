import { parse } from 'node-html-parser';
import moment from 'moment';

export async function scrapeRenaultEvents() {
  try {
    const response = await fetch('https://www.renaultgroup.com/en/finance-2/contact/'); // Replace with the actual URL if needed
    const data = await response.text();


    const root = parse(data);
    const eventElements = root.querySelectorAll('ul li');
    const events = [];
    const currentDate = moment();

    eventElements.forEach(eventElement => {
      const [descriptionElement, dateElement] = eventElement.childNodes;


      if (descriptionElement && dateElement) {
        const descriptionText = descriptionElement.text.trim();
        if(descriptionText){
            const dateText = dateElement.text.trim().replace('Thursday', '').trim();
            console.log(descriptionText, descriptionElement.text);
            if (moment(date).isSameOrAfter(currentDate)) {
                events.push({
                    date,
                    description: descriptionText,
                    url: 'https://www.renaultgroup.com/en/finance-2/contact/'
                });
            }
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping Renault events:', error);
    return [];
  }
}