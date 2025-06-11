export const getEventByMode = async (modes: string[]) => {
  const query = new URLSearchParams({ mode: modes.join(',') }).toString();

  const response = await fetch(`https://the-locals.deno.dev/events?${query}`);
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
