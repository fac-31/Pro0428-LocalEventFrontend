//import { Children } from 'react';

import CategoryBar from '../major/category-bar';
import Events from '../major/events';
import NavBar from '../major/nav-bar';
import SideBar from '../major/side-bar';

export default function EventLayout() {
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
        <div className="flex grow">
          <Events />
        </div>
      </div>
    </div>
  );
}

//LAST STOP - about to use tailwind to structure layout of events page
