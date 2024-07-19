import moment from 'moment';

export async function scrapeDanoneEvents() {
  try {
    const response = await fetch('https://www.danone.com/r.upcomingevent.json?pagePath=/content/corp/global/danone/danone-com/en/configuration/events');
    const data = await response.json();
    
    const events = [];

    const currentDate = moment().format('YYYY-MM-DD');

    data.events.map((item) => {
      const formattedDate = new Date(Number(item.time));
      const date = moment(formattedDate, 'YYYY-MM-DD').startOf('day');
      const description = item.name;

      if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
        events.push({ 
          date: date.format('YYYY-MM-DD'), 
          description: description, 
          url: item.link || 'https://www.danone.com/r.upcomingevent.json?pagePath=/content/corp/global/danone/danone-com/en/configuration/events' 
        });
      }
    });

    return events;

  } catch (error) {
    console.error('Error scraping Danone events:', error);
    return [];
  }
}
