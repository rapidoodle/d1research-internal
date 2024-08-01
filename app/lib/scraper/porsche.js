export async function scrapePorscheEvents() {
    try {
        const response = await fetch('https://tools.cms-eqs.com/e4012c/content/events?order%5Bstart%5D=asc&limit=25&page=1&years%5B%5D=2024', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhMjY2MWI4OGFlNWU1MjJkMjg0MzY3YjkwN2EzOThiNWZiN2FjZjQ0IiwiZXhwIjoxNzIyNDc4MjM3Ljg3Mn0.lWkik3mA5tBpDrCJj0AYezhBY1-4z4gthSXqtlY9OHw',
            }
        });
        console.log(response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}