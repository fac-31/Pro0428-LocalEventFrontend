import { Event } from 'models/event.model';
import { FiltersState } from '../components/major/side-bar/types';

export const filterEvents = (events: Event[], filters: FiltersState) => {
  return events.filter((event: Event) => {
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

    const now = new Date();
    const dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const filterDate = new Date(dateOnly);

    if (filters.date === 'today') {
      filterDate.setDate(filterDate.getDate() + 1);
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
/*     search: '',
    price: 50,
    distance: 20,
    date: today, week, month year,
    */
