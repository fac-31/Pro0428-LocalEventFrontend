/*
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { FiltersState } from '../components/major/side-bar/types';
import { getEventByMode } from '../api/services/events';
import { filterEvents } from '../utils/filterEvents';
import { FullEvent } from 'models/event.model';

export const useEvents = (filters: FiltersState) => {
  const [rawEvents, setRawEvents] = useState<FullEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<FullEvent[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events } = await getEventByMode(filters.selectedModes);
        console.log('=== EVENTS ===');
        console.log(data);
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

  console.log('=== RETURNED FROM USE EVENTS HOOK ===');
  console.log('filtered events', filteredEvents);
  console.log('raw events', rawEvents);

  return { rawEvents, filteredEvents };
};
*/
