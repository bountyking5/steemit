import React from 'react';
import { MdOutlineExplore } from "react-icons/md";
import UserSideManu from './usersidemanu';

const Sidenav = () => {
  return (
    <aside className="hidden md:block fixed left-0 top-[68px] h-[calc(100%-75px)] w-60 bg-cyan-950 text-white rounded-lg ml-1 shadow-lg " >
      <ul className="mt-4 space-y-2 p-5">
        {/* Explore button */}
        <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer mb-5">
          <MdOutlineExplore className="w-5 h-5 mr-2" /> {/* Icon with margin-right */}
          Explore
        </li>

        {/* Border for separation */}
        <div className='border-b mb-4'></div> {/* Added margin-bottom to give space from next component */}

      </ul>
      
      {/* User-specific menu items */}
      <UserSideManu />
    </aside>
  );
}

export default Sidenav;
