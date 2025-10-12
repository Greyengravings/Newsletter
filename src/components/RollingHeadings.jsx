// src/components/RollingHeadings.jsx

import React from 'react';

const headings = [
  "Featured",
  "Trending",
  "Popular",
];

const RollingHeadings = () => {
  const animatedHeadings = [...headings, ...headings];

  return (
    // CHANGE 2: Reduced py-4 to py-2 to decrease top and bottom padding
    <div className="flex items-center justify-center text-3xl font-bold py-2">
      <div className="h-[1.2em] overflow-hidden mr-3">
        <ul className="list-none m-0 p-0 animate-continuous-roll">
          {animatedHeadings.map((heading, index) => (
            <li key={index} className="text-blue-600 h-[1.2em]">
              {heading}
            </li>
          ))}
        </ul>
      </div>
      <span className="text-black-1000">Posts</span>
    </div>
  );
};

export default RollingHeadings;