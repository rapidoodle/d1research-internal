import fetch from 'node-fetch';
import moment from 'moment';

export async function scrapeLVMHEvents() {
  try {
    const url = 'https://www.lvmh.com/api/search';
    const payload = {queries : [
      {
        "indexName": "PRD-en-us-timestamp-desc",
        "params": {
          "facets": [],
          "filters": "category:event",
          "highlightPostTag": "__/ais-highlight__",
          "highlightPreTag": "__ais-highlight__",
          "hitsPerPage": 15,
          "page": 0,
          "query": "",
          "tagFilters": ""
        }
      }
    ] 
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    
    const data = await response.json();
    const events = [];
    const currentDate = moment();
    
    data.results[0].hits.forEach(item => {
      const eventDate = moment(item.eventDate, 'YYYY-MM-DD').startOf('day');
      if (eventDate.isValid() && (eventDate.isAfter(currentDate) || eventDate.isSame(currentDate))) {
        events.push({
          date: eventDate.format('YYYY-MM-DD'),
          description: item.name,
          url: `https://www.lvmh.com/financial-calendar`
        });
      }
    });

    return events;
  } catch (error) {
    console.error('Error scraping LVMH events:', error);
    return [];
  }
}