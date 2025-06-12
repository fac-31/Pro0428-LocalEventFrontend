import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';
import EventsContainer from '../major/eventsContainer.tsx';
import { useEventFilters } from '../../hooks/useEventFilters.ts';
import { saveUserEvents } from '../../api/services/users.ts';
import { useAuth } from '../../auth/useAuth.tsx';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getEventByMode } from '../../api/services/events.ts';
import { filterEvents } from '../../utils/filterEvents.ts';
import { Event } from 'models/event.model.ts';

// Create hook folder and extract the filter and event filter into it. along with usetheme.
export default function EventLayout() {
  const { filters, updateFilters } = useEventFilters();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const user = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events, savedEventIds } = await getEventByMode(
          filters.selectedModes,
        );
        setAllEvents(events);
        setSavedEventIds(savedEventIds);
      } catch (error) {
        console.error('Error fetching events: ' + error);
      }
    };
    fetchEvents();
  }, [filters.selectedModes, user.user]);

  const filteredEvents = filterEvents(allEvents, filters);

  const displayedEvents =
    location.pathname === '/savedevents'
      ? filteredEvents.filter((x) => savedEventIds.includes(String(x._id)))
      : filteredEvents;

  const handleSaveToggle = (eventId: string) => {
    if (!user.user) {
      navigate('/login');
      return;
    }
    setSavedEventIds((prev) => {
      const isSaved = prev.includes(eventId);
      const updated = isSaved
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId];
      saveUserEvents({ eventId, active: !isSaved });
      return updated;
    });
  };

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
          <EventsContainer
            events={displayedEvents}
            savedEventIds={savedEventIds}
            handleSaveToggle={handleSaveToggle}
          />
        </div>
      </div>
    </div>
  );
}
