import { useLocation } from 'react-router';
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
  const location = useLocation();
  const isSavedEventsPage = location.pathname === '/savedevents';
  const hasSavedEvents = savedEventIds.length > 0;

  const visibleEvents = isSavedEventsPage
    ? events.filter((event) => savedEventIds.includes(String(event._id)))
    : events;

  return (
    <div className="flex flex-wrap justify-center w-full max-w-screen-xxl mx-auto px-4 mt-3">
      {isSavedEventsPage && !hasSavedEvents ? (
        <p className="text-center w-full">No saved events yet.</p>
      ) : (
        visibleEvents.map((event) => (
          <Events
            key={String(event._id)}
            isSaved={savedEventIds.includes(String(event._id))}
            handleSaveToggle={handleSaveToggle}
            {...event}
          />
        ))
      )}
    </div>
  );
};

export default EventsContainer;
