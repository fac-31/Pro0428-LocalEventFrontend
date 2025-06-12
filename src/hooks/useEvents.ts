/*
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { FiltersState } from '../components/major/side-bar/types';
import { getEventByMode } from '../api/services/events';
import { filterEvents } from '../utils/filterEvents';
import { Event } from 'models/event.model';

export const useEvents = (filters: FiltersState) => {
  const [rawEvents, setRawEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events } = await getEventByMode(filters.selectedModes);
        setRawEvents(events);
      } catch (error) {
        console.error('Error fetching events with saved info:', error);
      }
    };

    fetchEvents();
  }, [filters.selectedModes, location.pathname]);

  useEffect(() => {
    setFilteredEvents(filterEvents(rawEvents, filters));
  }, [rawEvents, filters]);

  return { rawEvents, filteredEvents };
};
*/
