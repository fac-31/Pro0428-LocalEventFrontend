import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';
import EventsContainer from '../major/eventsContainer.tsx';
import { useEventFilters } from '../../hooks/useEventFilters.ts';
import { useEvents } from '../../hooks/useEvents.ts';

// Create hook folder and extract the filter and event filter into it. along with usetheme.
export default function EventLayout() {
  const { filters, updateFilters } = useEventFilters();
  const { filteredEvents } = useEvents(filters);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-accent">
        <NavBar />
      </div>

      <div className="flex flex-1">
        <div className="h-full border-r bg-accent">
          <SideBar filters={filters} updateFilters={updateFilters} />
        </div>
        <div className="flex flex-1">
          <EventsContainer events={filteredEvents} />
        </div>
      </div>
    </div>
  );
}
