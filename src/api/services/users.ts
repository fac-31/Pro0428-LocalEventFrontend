import api from '../api';
import { ObjectId } from 'mongodb';

type UserEvent = {
  userId: ObjectId;
  eventId: ObjectId;
};

export const saveUserEvents = async (userEvent: UserEvent) => {
  try {
    await api.post('saveUserEvents', userEvent);
    console.log('Saved sucessfully');
    return {};
  } catch (error) {
    new Error(error);
  }
};
