//import { Children } from 'react';

import CategoryBar from '../category-bar';
import Events from '../events';
import NavBar from '../nav-bar';
import SideBar from '../side-bar';

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
