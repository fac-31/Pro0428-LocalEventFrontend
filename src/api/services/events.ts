export const getEventByMode = async (modes: string[]) => {
  const query = new URLSearchParams({ mode: modes.join(',') }).toString();

  const response = await fetch(`https://the-locals.deno.dev/events?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  console.log(response.json());
  return response.json();
};
