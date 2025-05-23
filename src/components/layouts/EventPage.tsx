import { ReactNode } from 'react';

import CategoryBar from '../major/category-bar';
import Events from '../major/events';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';

import { GetRouterAPI } from '../../api/util.ts';

export default function EventLayout() {
  const events = GetRouterAPI('events');

  const infos: Array<ReactNode> = [];
  for (let i = 0; i < events.length; i++) infos.push(Events(events[i]));

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
        <div className="flex grow">{infos}</div>
      </div>
    </div>
  );
}

//LAST STOP - about to use tailwind to structure layout of events page
