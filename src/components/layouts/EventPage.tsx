import Events from '../major/events';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';
import { FetchAPI } from '../../api/util.ts';
import { useState } from 'react';
import { ModeId, DateString } from '../major/side-bar/types.ts';

export default function EventLayout() {
  const [selectedModes, setSelectedModes] = useState<ModeId[]>(['music']);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(0);
  const [distance, setDistance] = useState(0);
  const [date, setdate] = useState<DateString>('this month');

  const events = FetchAPI('events');

  const info = [];
  for (let i = 0; i < events.length; i++) info.push(Events(events[i]));

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="fixed top-0 left-0 w-full z-50 bg-accent">
        <NavBar />
      </div>

      <div className="flex flex-1">
        <div className="fixed h-full border-r bg-accent ">
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

        <main className="flex-1 overflow-y-auto mt-10 ml-10 text-center">
          For dev purposes only. Delete me when implementing events
          <p>{selectedModes}</p>
          <p>{search}</p>
          <p>max: £{price}</p>
          <p>max: {distance}km</p>
          <p>{date}</p>
          {events.map((event, index) => (
            <Events key={index} {...event} />
          ))}
        </main>
      </div>
    </div>
  );
}
