import axios from 'axios';
import { Event } from '../../types/Event';

const API_URL = 'http://localhost:3000';

export const getAllEvents = () =>
  axios.get<Event[]>(`${API_URL}/events`).then((res) => res.data);
