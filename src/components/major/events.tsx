import { Event } from '../../types/Event';

interface Props {
  events: Event[];
}

export default function Events({ events }: Props) {
  return (
    <div>
      {events.map((event) => (
        <h2 key={event._id}>{event.name}</h2>
      ))}
    </div>
  );
}
