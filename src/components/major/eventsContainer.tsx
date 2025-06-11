import Events from './events';
import { FullEvent } from 'models/event.model';

type Props = {
  events: FullEvent[];
};

const EventsContainer = ({ events }: Props) => {
  return (
    <div className="flex flex-col grow items-center mt-12">
      {events.map((event: FullEvent) => (
        <Events {...event} />
      ))}
    </div>
  );
};

export default EventsContainer;
