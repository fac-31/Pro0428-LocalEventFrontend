import api from '../api';

type UserEvent = {
  eventId: string;
  active: boolean;
};

export const saveUserEvents = async (userEvent: UserEvent) => {
  try {
    await api.post('users/saveUserEvents', userEvent);
    console.log('Saved sucessfully');
    return {};
  } catch (error) {
    console.error('Error saveing event: ' + error);
  }
};

export const getUserEventByMode = async (modes: string[]) => {
  try {
    const response = await api.get('users/userEvents', {
      params: { mode: modes.join(',') },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events: ' + error);
  }
};
