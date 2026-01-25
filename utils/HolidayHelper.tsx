import holidayData from '../assets/holidays.json';

// Get all public holiday dates as a simple array for easy checking
export const getPublicHolidays = () => {
  return holidayData.response.holidays
    .filter(h => h.primary_type === "Public Holiday")
    .map(h => h.date.iso);
};

// Calculate actual leave days used (excluding public holidays and weekends)
export const calculateLeaveDays = (startDate : any, endDate: any) => {
  const publicHolidays = getPublicHolidays();
  let count = 0;
  let curDate = new Date(startDate);
  const stopDate = new Date(endDate);

  while (curDate <= stopDate) {
    const isoStr = curDate.toISOString().split('T')[0];
    const dayOfWeek = curDate.getDay();
    
    // Check if not a weekend (0=Sun, 6=Sat) and not a public holiday
    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !publicHolidays.includes(isoStr)) {
      count++;
    }
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};