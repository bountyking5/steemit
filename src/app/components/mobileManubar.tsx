import React from "react";
import {Tabs, Tab} from "@nextui-org/react";


const MobileManubar = () => {
  return (
    // <div className="md:hidden   text-white shadow-lg font-bold rounded-l-2xl rounded-r-2xl    " >
    <div className="flex w-full flex-col items-center ">
      <Tabs aria-label="Options" color="primary" variant="bordered" className="md:hidden" style={{ marginTop: '4.5rem'}}>
        <Tab
          key="Explore"
          title={
            <div className="flex items-center space-x-2">
              {/* <GalleryIcon/> */}
              <span>Explore</span>
            </div>
          }
        />
        <Tab
          key="Profile"
          title={
            <div className="flex items-center space-x-2">
              {/* <MusicIcon/> */}
              <span>Profile</span>
            </div>
          }
        />
        <Tab
          key="Communities"
          title={
            <div className="flex items-center space-x-2">
              {/* <VideoIcon/> */}
              <span>Communities</span>
            </div>
          }
        />
 
      <Tab
          key="Wallet"
          title={
            <div className="flex items-center space-x-2">
              {/* <VideoIcon/> */}
              <span>Wallet</span>
            </div>
          }
        />
      </Tabs>
     </div>  
      
      // </div>
    // </div>
  );
};

export default MobileManubar;





