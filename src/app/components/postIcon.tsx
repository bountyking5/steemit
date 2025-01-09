"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaPenNib } from "react-icons/fa6";

const Posticon = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link href="/submit" passHref>
      <div
        style={{
          marginRight: "0.3rem",
          marginLeft: "0.5rem",
          cursor: "pointer",
          color: isHovered ? "#f5a524" : "white", // Change color on hover
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaPenNib size={21} />
      </div>
    </Link>
  );
};

export default Posticon;
