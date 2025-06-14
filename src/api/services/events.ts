import axios from 'axios';
import api from '../api';

import { Event } from 'models/event.model';
import {
  GeneralResponse,
  MessageResponse,
  ErrorResponse,
} from 'services/general.service';

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
