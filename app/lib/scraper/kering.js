import moment from 'moment';

export async function scrapeKeringEvents() {
    try {
        const response = await fetch('https://www.kering.com/api/events/?year=2024&type=finance&locale=en')
        const data = await response.json();
        
        const events = [];

        const currentDate = moment().format('YYYY-MM-DD');

        data.events.forEach((item) => {
            const event = item.agendaTabCtaContentProps;
            const formattedDate = new Date(event.startEventDate);
            const date          = moment(formattedDate, 'YYYY-MM-DD').startOf('day');
            const cDate         = moment(currentDate, 'YYYY-MM-DD').startOf('day');
            const description   = event.titleEvent;

            if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
                events.push({ date: date.format('YYYY-MM-DD'), description: description, url : 'https://www.kering.com/api/events/?year=2024&type=finance&locale=en' });
            }
        });

        return events;

    } catch (error) {
      console.error('Error scraping SAP events:', error);
      return [];
    }
  }