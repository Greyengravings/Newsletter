// src/components/SocialIcon.jsx - according to folder structure (implemented on the blog site)

import React from 'react';
// This component now has a single, refined size.
const SocialIcon = ({ social, tooltip, href, children }) => {
  
  const colorConfig = {
    linkedin: 'bg-[#0274b3]',
    github: 'bg-[#24262a]',
    instagram: 'bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]',
    default: 'bg-gray-800'
  };

  const socialClass = colorConfig[social] || colorConfig.default;

  return (
    <li className="relative group">
      <a
        href={href}
        aria-label={tooltip}
        // CHANGE 1: Set a fixed, well-proportioned circle size
        className="relative overflow-hidden flex justify-center items-center w-12 h-12 rounded-full bg-white text-[#4d4d4d] hover:text-white transition-all duration-900 ease-in-out hover:shadow-lg"
      >
        <div
          className={`absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-800 ease-in-out ${socialClass}`}
        ></div>
        
        {/* CHANGE 2: Set a fixed icon size that looks better inside the circle */}
        <div className="relative z-10 w-7 h-7">
            {children}
        </div>
      </a>
      
      <div
        className={`absolute top-[-30px] left-1/2 -translate-x-1/2 text-white px-2.5 py-1.5 rounded-md opacity-0 invisible text-sm transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:top-[-50px] ${socialClass}`}
      >
        {tooltip}
      </div>
    </li>
  );
};

export default SocialIcon;