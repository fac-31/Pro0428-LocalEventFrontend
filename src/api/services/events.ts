export const getEventByMode = async (modes: string[]) => {
  const query = new URLSearchParams({ mode: modes.join(',') }).toString();

  const response = await fetch(`http://localhost:3000/events?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};
