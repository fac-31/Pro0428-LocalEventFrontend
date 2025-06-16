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
import { FullEvent } from 'models/event.model.ts';
import { FiltersState } from '../major/side-bar/types.ts';

export default function EventLayout() {
  const { filters, updateFilters } = useEventFilters();
  const [allEvents, setAllEvents] = useState<FullEvent[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events, savedEventIds } = await getEventByMode(
          filters.selectedModes,
        );
        const result = await getEventByMode(filters.selectedModes);
        console.log('=== FULL RESULT FROM getEventByMode ===');
        console.log(result);
        console.log('=== EVENTS PROPERTY ===');
        console.log(result?.events);
        console.log('=== SAVED EVENT IDS ===');
        console.log(result?.savedEventIds);

        setAllEvents(events);
        setSavedEventIds(savedEventIds);
      } catch (error) {
        console.error('Error fetching events: ' + error);
      }
    };
    fetchEvents();
  }, [filters.selectedModes, user]);

  const filteredEvents = allEvents ? filterEvents(allEvents, filters) : [];

  const displayedEvents =
    location.pathname === '/savedevents'
      ? filteredEvents.filter((x) => savedEventIds.includes(String(x._id)))
      : filteredEvents;

  const handleSaveToggle = (eventId: string) => {
    if (!user) {
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

  function generateFilterDescription(filters: FiltersState): string {
    const { selectedModes, price, distance, search, date } = filters;

    const parts: string[] = [];

    if (selectedModes.length) {
      parts.push(`showing ${selectedModes.join(', ')}`);
    }

    if (price > 0 && price < 50) {
      parts.push(`under £${price}`);
    }

    if (distance > 0 && distance < 30) {
      parts.push(`up to ${distance}km away`);
    }

    if (search.trim()) {
      parts.push(`including "${search.trim()}"`);
    }

    if (date && date !== 'this year') {
      parts.push(`happening ${date}`);
    }

    return parts.length ? parts.join(', ') : 'showing everything';
  }

  return (
    <div className="h-screen w-screen overflow-hidden pl-4">
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-accent">
        <NavBar />
      </div>

      {/* Main layout area */}
      <div className="flex pt-8 h-full ml-10">
        {/* Sidebar */}
        <div className="h-full border-r bg-accent shrink-0">
          <SideBar filters={filters} updateFilters={updateFilters} />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <h1 className="text-5xl font-bold text-center mt-4">
            FINSBURY EVENTS
          </h1>
          <p className="text-center">{generateFilterDescription(filters)}</p>
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
