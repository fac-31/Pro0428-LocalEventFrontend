import Events from './events';
import { FullEvent } from 'models/event.model';

type Props = {
  events: FullEvent[];
  savedEventIds: string[];
  handleSaveToggle: (id: string) => void;
};

const EventsContainer = ({
  events,
  savedEventIds,
  handleSaveToggle,
}: Props) => {
  return (
    <div className="flex flex-col grow items-center mt-12">
      {events.map((event) => (
        <Events
          key={String(event._id)}
          isSaved={savedEventIds.includes(String(event._id))}
          handleSaveToggle={handleSaveToggle}
          {...event}
        />
      ))}
    </div>
  );
};

export default EventsContainer;
