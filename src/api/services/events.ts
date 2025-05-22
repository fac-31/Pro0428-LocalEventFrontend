import axios from 'axios';

const getAll = async () => {
  const response = await axios.get('/events');
  return response.data;
};

const events = {
  getAll,
};

export default events;
