import Events from './events';
import { Event } from 'models/event.model';

type Props = {
  events: Event[];
};

const EventsContainer = ({ events }: Props) => {
  return (
    <div className="flex flex-col grow items-center mt-12">
      {events.map((event) => (
        <Events
          mode={event.mode}
          name={event.name}
          date={event.date}
          price={event.price}
          description={event.description}
          distance={event.distance}
          location={event.location}
          url={event.url}
        />
      ))}
    </div>
  );
};

export default EventsContainer;
