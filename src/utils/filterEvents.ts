import { Event } from '../models/event.model';

export const filterEvents = (events: Event[], filters) => {
  return events.filter((event: Event) => {
    const searchMatch =
      filters.search === '' ||
      event.name
        .toLocaleLowerCase()
        .includes(filters.search.toLocaleLowerCase());

    const priceMatch = event.price <= filters.price;

    const distanceMatch = event.distance <= filters.distance;

    const eventDate = new Date(event.date);

    let filterDate = null;

    const date = new Date();

    switch (true) {
      case filters.date === 'today':
        filterDate = date.setDate(date.getDate());
        break;
      case filters.date === 'this week':
        filterDate = date.setDate(date.getDate() + 7);
        break;
      case filters.date === 'this month':
        filterDate = date.setMonth(date.getMonth() + 1);
        break;
      case filters.date === 'this year':
        filterDate = date.setFullYear(date.getFullYear() + 1);
    }

    // const dateMatch =
    return (
      priceMatch && distanceMatch && searchMatch && filterDate && eventDate
    );
  });
};
/*     search: '',
    price: 50,
    distance: 20,
    date: today, week, month year,
    */
