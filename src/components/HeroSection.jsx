import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeroSection({ posts }) {
  // Use the first 4 posts from the database for the hero
  const heroPosts = posts.slice(0, 4).map(post => ({
    id: post._id,
    category: 'RECENT POST',
    title: post.title,
    imageUrl: post.imageUrl || '/images.jpeg', // fallback image
  }));

  // Duplicate posts for the initial automatic scroll loop
  const duplicatedHeroPosts = [...heroPosts, ...heroPosts];

  // State to manage which mode is active: 'auto' or 'manual'
  const [scrollMode, setScrollMode] = useState('auto');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleWheel = (e) => {
        // If user starts scrolling, switch to manual mode permanently
        if (scrollMode === 'auto') {
          setScrollMode('manual');
        }
        
        // This part runs after the mode is switched to manual
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      };

      // Add the wheel event listener
      container.addEventListener('wheel', handleWheel, { passive: false });

      // Cleanup the event listener when the component unmounts
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [scrollMode]);

  const buttonStyles = "border-2 border-blue-600 text-white bg-blue-600/50 backdrop-blur-sm px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold";

  return (
    <div className="w-full relative mb-12 hero-container">
      <div
        ref={scrollContainerRef}
        // Conditionally apply classes based on the scroll mode
        className={`flex ${scrollMode === 'auto' ? 'animate-scroll' : 'overflow-x-scroll scrollbar-hide'}`}
      >
        {/*
          Show duplicated posts for auto-scroll for a seamless loop.
          Show single set of posts for manual scroll.
        */}
        {(scrollMode === 'auto' ? duplicatedHeroPosts : heroPosts).map((post, index) => (
          <div
            key={`${post.id}-${index}`}
            className="relative w-[90vw] md:w-[50vw] h-80 flex-shrink-0 mx-4 rounded-xl shadow-xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url(${post.imageUrl})` }}
            ></div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
              <p className="text-sm font-bold tracking-widest uppercase text-gray-300">{post.category}</p>
              <h2 className="text-3xl font-extrabold mt-2 mb-4">{post.title}</h2>
              <Link to={`/post/${post.id}`} className={buttonStyles}>
                Read Blog
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;