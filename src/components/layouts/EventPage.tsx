import { ReactNode, useState } from 'react';
import Events from '../major/events';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';
import { GetRouterAPI } from '../../api/util.ts';
import { FiltersState } from '../major/side-bar/types.ts';

export default function EventLayout() {
  const [filters, setFilters] = useState<FiltersState>({
    selectedModes: ['music'],
    search: '',
    price: 50,
    distance: 20,
    date: 'this month',
  });

  const updateFilters = (updates: Partial<FiltersState>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const events = GetRouterAPI('events');
  const infos: Array<ReactNode> = [];
  for (let i = 0; i < events.length; i++) {
    infos.push(Events(events[i]));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-accent">
        <NavBar />
      </div>

      <div className="flex flex-1">
        <div className="h-full border-r bg-accent">
          <SideBar filters={filters} updateFilters={updateFilters} />
        </div>
        <div className="flex flex-col grow items-center mt-12">{infos}</div>
      </div>
    </div>
  );
}
