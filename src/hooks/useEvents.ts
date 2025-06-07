import { useState, useEffect } from 'react';
import { FiltersState } from '../components/major/side-bar/types';
import { getEventByMode } from '../api/services/events';
import { filterEvents } from '../utils/filterEvents';
import { Event } from 'models/event.model';

export const useEvents = (filters: FiltersState) => {
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
  return { rawEvents, filteredEvents };
};
