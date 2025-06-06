//component for events data
import { Event } from 'models/event.model.ts';

export default function Events(info: Event) {
  return (
    <div className="p-4 m-4 border solid white rounded w-[50%]">
      <h1 className="text-xl font-bold">{info.name}</h1>
      <p>{info.location}</p>
      <p>{new Date(info.date).toLocaleDateString()}</p>
      <p>{info.description}</p>
      <p>Price: {info.price}</p>
      <p>More info can be found here - {info.url}</p>
    </div>
  );
}
