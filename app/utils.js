export default function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    
    const options = {
        weekday: 'short', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
}