import axios from 'axios';
import api from '../api';

import { Event } from 'models/event.model';

export const getEventByMode = async (modes: string[]) => {
  const query = new URLSearchParams({ mode: modes.join(',') }).toString();

  const response = await fetch(`http://localhost:3000/events?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const getEventById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/events/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
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
