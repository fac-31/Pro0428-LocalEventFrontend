import { FullEvent } from 'models/event.model';
import { FiltersState } from '../components/major/side-bar/types';

export const filterEvents = (events: FullEvent[], filters: FiltersState) => {
  return events.filter((event: FullEvent) => {
    const searchMatch =
      filters.search === '' ||
      event.name
        .toLocaleLowerCase()
        .includes(filters.search.toLocaleLowerCase());

    const priceMatch = event.price <= filters.price;

    const distanceMatch = event.distance <= filters.distance;

    const eventDate = new Date(event.date);
    const eventDateOnly = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
    );

    const eventDate = new Date(event.date); // full date with time
    const now = new Date();

    // Create date range filters
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setHours(23, 59, 59, 999);

    let dateMatch = true;

    if (filters.date === 'today') {
      // Match if event is today
      dateMatch = eventDate >= startOfToday && eventDate <= endOfToday;
    } else if (filters.date === 'this week') {
      const endOfWeek = new Date(startOfToday);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      dateMatch = eventDate >= startOfToday && eventDate <= endOfWeek;
    } else if (filters.date === 'this month') {
      const endOfMonth = new Date(startOfToday);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      dateMatch = eventDate >= startOfToday && eventDate <= endOfMonth;
    } else if (filters.date === 'this year') {
      const endOfYear = new Date(startOfToday);
      endOfYear.setFullYear(endOfYear.getFullYear() + 1);
      dateMatch = eventDate >= startOfToday && eventDate <= endOfYear;
    }

    return priceMatch && distanceMatch && searchMatch && dateMatch;
    /*
    const now = new Date();
    const dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const filterDate = new Date(dateOnly);
    if (filters.date === 'today') {
      filterDate.setDate(filters.date() + 1);
    } else if (filters.date === 'this week') {
      filterDate.setDate(filterDate.getDate() + 7);
    } else if (filters.date === 'this month') {
      filterDate.setMonth(filterDate.getMonth() + 1);
    } else if (filters.date === 'this year') {
      filterDate.setFullYear(filterDate.getFullYear() + 1);
    }

    const dateMatch = eventDateOnly <= filterDate;
    console.log('===FILTER RESULTS===');
    console.log('Price match', priceMatch);
    console.log('Distance match', distanceMatch);
    console.log('date match', dateMatch);
    return priceMatch && distanceMatch && searchMatch && dateMatch;
  });
};
*/
/*     search: '',
    price: 50,
    distance: 20,
    date: today, week, month year,
    */
