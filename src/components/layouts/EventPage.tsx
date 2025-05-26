import { ReactNode, useState } from 'react';

import Events from '../major/events';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';

import { GetRouterAPI } from '../../api/util.ts';
import { ModeId, DateString } from '../major/side-bar/types.ts';

export default function EventLayout() {
  const [selectedModes, setSelectedModes] = useState<ModeId[]>(['music']);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(0);
  const [distance, setDistance] = useState(0);
  const [date, setdate] = useState<DateString>('this month');
  const events = GetRouterAPI('events');

  const infos: Array<ReactNode> = [];
  for (let i = 0; i < events.length; i++) infos.push(Events(events[i]));

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
        <div className="flex grow">{infos}</div>
      </div>
    </div>
  );
}
