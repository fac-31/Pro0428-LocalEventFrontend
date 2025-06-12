import api from '../api';

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
