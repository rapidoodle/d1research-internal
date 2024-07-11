import moment from "moment";
import { Badge } from "react-bootstrap";

export const formatCurrency = (amount) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (dateStr, locale) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const formatClinkedDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const offset = -date.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
  const offsetSign = offset >= 0 ? '+' : '-';
  const timeZoneOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;

  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timeZoneOffset}[${timeZoneName}]`;
}


export const cleanCurrency = (value) => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/,/g, ''));
  }
  return value;
}

export const cleanCompanyName = (word) => {
  return word.toLowerCase().replace(/\s/g, '_');
}

//function to make number to 2 decimal places
export const formatNumber = (number, isPercent) => {
  //check if number or string is passed
  if(!number){
    return "-" ;
  }else{

    if(number === 'NaN'){
      return;
    }

    const num = Number(number);
    const finalNumber = Number.isInteger(num) ? num : num.toFixed(2);
    
    if(isPercent){
      return finalNumber+ '%';
    }
  
    return finalNumber;
  }
}

export const coloredNumber = (number, isPercent = false, isColored = false) => {
  //check if number or string is passed
  if(!number){
    return "-" ;
  }else{

    if(number === 'NaN'){
      return;
    }

    const num = Number(number);
    const finalNumber = Number.isInteger(num) ? num : num.toFixed(2);
    
    if(isPercent){
      return finalNumber+ '%';
    }

    if(isColored){
      return finalNumber > 0 ? 
      <div class="positive-number">{finalNumber}</div> :
      <div class="negative-number">{finalNumber}</div> ;
    }
  
    return finalNumber;
  }
}

export const formatCompanyData = ( data, isPercent = false, isComma = true ) => {
  if(!data || data === 'NaN'){
    return "-"
  }


  var num = Number(data);
  if(isPercent){
    return num.toFixed(2) + '%';
  }

  //add comma and space
  if(isComma){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return num.toFixed(2);
}

//function to format current with comma, dollar sign and 2 decimal places
export const formatCurrencyWithDollar = (amount) => {

  if(!amount || amount === 'NaN'){
    return "-";
  }else{
    //convert amount to number
    const num = Number(amount);
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}

export const cleanComment = (comment) => {
  return comment.replace(/'/g, "''").replace(/"/g, '""');
}
export const cleanedString = (input) => {
  // Replace double single quotes with a single quote
  let cleanedString = input.replace(/''/g, "'");
  // Escape single quotes for SQL insertion
  cleanedString = cleanedString.replace(/'/g, "''");
  return cleanedString;
}
// Function to get start and end date
export const getStartAndEndDate = (dateInput, offset = '+01:00') => {
  let startDate = moment(dateInput).utcOffset(offset).startOf('day'); // 00:00:00
  let endDate = moment(dateInput).utcOffset(offset).endOf('day'); // 23:59:59
  return {
    startDate: startDate.format('DD MMMM YYYY hh:mm A'),
    endDate: endDate.format('DD MMMM YYYY hh:mm A')
  };
}