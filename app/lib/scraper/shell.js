import moment from 'moment';

export async function scrapeShellEvents() {
  try {
    const url = 'https://tools.eurolandir.com/tools/FinCalendar2/Home/CalendarTimeline?companycode=uk-rdsa&lang=en-gb';
    const response = await fetch(url);
    const data = await response.json();

    const events = [];
    const currentDate = moment().format('YYYY-MM-DD');

    data.data.forEach(monthData => {
      monthData.events.forEach(event => {
        const dateText = event.dateString;
        const description = event.title;
        const formattedDate = moment(dateText, 'DD MMM YYYY').startOf('day');

        if (formattedDate.isValid() && (formattedDate.isAfter(currentDate) || formattedDate.isSame(currentDate))) {
          events.push({
            date: formattedDate.format('YYYY-MM-DD'),
            description: description,
            url: 'https://www.shell.com/investors/financial-calendar.html' // Adjust the URL if necessary
          });
        }

        console.log(description, dateText);
      });
    });

    return events;
  } catch (error) {
    console.error('Error scraping Shell events:', error);
    return [];
  }
}