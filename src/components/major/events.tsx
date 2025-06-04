//component for events data
import { Event } from 'models/event.model.ts';

export default function Events(info: Event) {
  return (
    <h2>
      {info.mode} - {info.name}
    </h2>
  );
}
