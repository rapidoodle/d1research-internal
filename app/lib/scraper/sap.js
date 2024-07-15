import moment from 'moment';

export async function scrapeSAPEvents() {
    try {
        const response = await fetch('https://www.sap.com/bin/sapdx/solrsearch?showEmptyTags=false&isResourceCenter=true&highlighting=false&hideFacets=false&additionalProcess=false&showEventInfo=true&isDateRange=false&isEventPeriod=false&fuzzySearch=true&isFullTextSearch=false&pageLocale=en_us&json=%7B%22componentPath%22%3A%22%2Fcontent%2Finvestors%2Fsap-se%2Fen%2Fcalendar%2Fjcr%3Acontent%2Fpar%2Fsection_copy_copy%2Fsection-par%2Fresourcecenterdynamic%2Fitems%2Fitem_1661418297405%22%2C%22search%22%3A%5B%5D%2C%22pagePath%22%3A%22%2Fcontent%2Finvestors%2Fsap-se%2Fen%2Fcalendar%22%2C%22page%22%3A1%2C%22pageCount%22%3A48%2C%22searchText%22%3A%22%22%2C%22sortName%22%3A%22startDate%22%2C%22sortType%22%3A%22asc%22%2C%22isMultiselectSearch%22%3Afalse%7D');

        const data = await response.json();
        
        const events = [];

        const currentDate = moment().format('YYYY-MM-DD');

        data.results.forEach((item) => {
            const formattedDate = new Date(item.startDate);
            const date          = moment(formattedDate, 'YYYY-MM-DD').startOf('day');
            const cDate         = moment(currentDate, 'YYYY-MM-DD').startOf('day');
            const description   = item.title;

            if (date.isValid() && (date.isAfter(currentDate) || date.isSame(currentDate))) {
                events.push({ date: date.format('YYYY-MM-DD'), description: description, url : 'https://www.sap.com/investors/en/calendar.html' });
            }
        });

        return events;

    } catch (error) {
      console.error('Error scraping SAP events:', error);
      return [];
    }
  }