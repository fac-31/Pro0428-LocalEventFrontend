//import { Children } from 'react';

import CategoryBar from '../major/category-bar';
import Events from '../major/events';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';

import { FetchAPI } from '../../api/util.ts';
import { Event } from '../../models/event.model.ts';

export default function EventLayout() {
  const events = FetchAPI('events');

  const info: Array<Event> = [];
  for (let i = 0; i < events.length; i++) info.push(Events(events[i]));

  return (
    <div className="flex-col">
      <div className="">
        <NavBar />
        <CategoryBar />
      </div>
      <div className="flex justify-around">
        <div className="mr-5 flex shrink">
          <SideBar />
        </div>
        <div className="flex grow">{info}</div>
      </div>
    </div>
  );
}

//LAST STOP - about to use tailwind to structure layout of events page
