import { useEvents } from '../../hooks/useEvents';
import CategoryBar from '../major/category-bar';
import Events from '../major/events';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';

export default function EventLayout() {
  const { events, loading, error } = useEvents();

  return (
    <div className="flex-col">
      <header>
        <NavBar />
        <CategoryBar />
      </header>

      <div className="flex justify-around">
        <aside className="mr-5 flex shrink">
          <SideBar />
        </aside>

        <main className="flex grow p-4">
          {loading && <p>Loading events...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && <Events events={events} />}
        </main>
      </div>
    </div>
  );
}
