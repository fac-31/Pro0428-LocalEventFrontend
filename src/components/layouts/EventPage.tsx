import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';
import { FetchAPI } from '../../api/util.ts';
import { useState } from 'react';
import { ModeId, DateString } from '../major/side-bar/types.ts';

type Event = {
  mode: string;
  name: string;
  location: string;
};

export default function EventLayout() {
  const [selectedModes, setSelectedModes] = useState<ModeId[]>(['music']);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(0);
  const [distance, setDistance] = useState(0);
  const [date, setdate] = useState<DateString>('this month');

  const events = FetchAPI('events') || [];

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="fixed top-0 left-0 w-full z-50 bg-accent">
        <NavBar />
      </div>

      <div className="flex flex-1">
        <div className="h-full border-r bg-accent ">
          <SideBar
            selectedModes={selectedModes}
            setSelectedModes={setSelectedModes}
            search={search}
            setSearch={setSearch}
            price={price}
            setPrice={setPrice}
            distance={distance}
            setDistance={setDistance}
            date={date}
            setdate={setdate}
          />
        </div>

        <main className="flex-1 overflow-y-auto mt-10 ml-15 text-center">
          For dev purposes only. Delete me when implementing events
          <p>{selectedModes}</p>
          <p>{search}</p>
          <p>max: £{price}</p>
          <p>max: {distance}km</p>
          <p>{date}</p>
          {/* REPLACE WITH ACTUAL EVENTS */}
          {events.map((event: Event, index) => (
            <div key={index} className="p-4 border-b border-text">
              <p className="text-lg font-bold">{event.mode}</p>
              <p className="text-md">{event.name}</p>
              <p className="text-md">{event.location}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
