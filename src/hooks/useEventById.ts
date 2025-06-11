import { useState, useEffect } from 'react';
import { getEventById } from '../api/services/events';
import { Event } from 'models/event.model';

export const useEventById = (id: string) => {
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        new Error('Error setting event by id: ' + error);
      }
    };
    getEvent();
  }, [id]);

  return { event, setEvent };
};
