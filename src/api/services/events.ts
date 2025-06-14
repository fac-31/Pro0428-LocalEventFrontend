import axios from 'axios';
import api from '../api';

import { Event } from 'models/event.model';
import {
  GeneralResponse,
  MessageResponse,
  ErrorResponse,
} from 'services/general.service';

export const getEventByMode = async (modes: string[]) => {
  console.log('getting events by mode...');
  try {
    const response = await api.get('/events', {
      params: { mode: modes.join(',') },
    });
    console.log('=== RESPONSE DATA FROM BACKEND ===');
    console.log(response.data);
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

export const updateEventById = async (
  id: string,
  event: Event,
): Promise<GeneralResponse> => {
  try {
    const { data } = await api.put<GeneralResponse>('/events/' + id, event);
    return data as MessageResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return error.response.data as ErrorResponse;
    }
    throw error;
  }
};

export const deleteEventById = async (id: string): Promise<GeneralResponse> => {
  try {
    const { data } = await api.delete<GeneralResponse>('/events/' + id);
    return data as MessageResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return error.response.data as ErrorResponse;
    }
    throw error;
  }
};
