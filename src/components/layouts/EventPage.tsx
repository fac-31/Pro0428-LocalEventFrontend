import { useEffect, useState } from 'react';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';
import { FiltersState } from '../major/side-bar/types.ts';
import EventsContainer from '../major/eventsContainer.tsx';
import { getEventByMode } from '../../api/services/events.ts';
import { filterEvents } from '../../utils/filterEvents.ts';
import { Event } from 'models/event.model.ts';

export default function EventLayout() {
  const [filters, setFilters] = useState<FiltersState>({
    selectedModes: ['music'],
    search: '',
    price: 50,
    distance: 20,
    date: 'this month',
  });

  const updateFilters = (updates: Partial<FiltersState>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const [rawEvents, setRawEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await getEventByMode(filters.selectedModes);
        setRawEvents(data);
      } catch (error) {
        new Error('Error setting events by mode: ' + error);
      }
    };
    getEvents();
  }, [filters.selectedModes]);

  useEffect(() => {
    setFilteredEvents(filterEvents(rawEvents, filters));
  }, [rawEvents, filters]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-accent">
        <NavBar />
      </div>

      <div className="flex flex-1">
        <div className="h-full border-r bg-accent">
          <SideBar filters={filters} updateFilters={updateFilters} />
        </div>
        <div className="flex flex-1">
          <EventsContainer events={filteredEvents} />
        </div>
      </div>
    </div>
  );
}
