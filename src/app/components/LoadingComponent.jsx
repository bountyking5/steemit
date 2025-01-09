import React from 'react'
import {Spinner} from "@nextui-org/react";

const LoadingComponent = () => {
  return (
    
    <div className="flex mt-5 gap-4">
     
      <Spinner color="primary" label="Primary" labelColor="primary" />
      <Image
      src="/loading.svg"
      alt="logo"
      width={150}
      height={50}
      className="cursor-pointer mt-1 "
      priority
    />
     
    </div>
  );
}

  


export default LoadingComponent