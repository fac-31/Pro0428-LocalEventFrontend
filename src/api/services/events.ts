import axios from 'axios';
import api from '../api';

import { Event } from 'models/event.model';

export const getEventByMode = async (modes: string[]) => {
  try {
    const response = await api.get('/events', {
      params: { mode: modes.join(',') },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events: ' + error);
  }
};

export const getEventById = async (id: string) => {
  const response = await fetch(`https://the-locals.deno.dev/events/${id}`);
  const events = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  if (response) {
    console.log('=== RETURNED FROM GET EVENTS BY MODE ===');
    console.log(events);
  }
  return events;
};

export interface UpdateEventResponse {
  message: string;
}

export const updateEventById = async (
  id: string,
  event: Event,
): Promise<UpdateEventResponse | null> => {
  try {
    const { data } = await api.put<UpdateEventResponse>('/events/' + id, event);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export interface DeleteEventResponse {
  message: string;
}

export const deleteEventById = async (
  id: string,
): Promise<DeleteEventResponse | null> => {
  try {
    const { data } = await api.delete<DeleteEventResponse>('/events/' + id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
