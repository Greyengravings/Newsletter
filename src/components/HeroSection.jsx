import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';

function HeroSection({ posts }) {
  const { theme, reduceAnimations } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const hoverTimerRef = useRef(null);

  // Responsive itemsPerView: show 5 on PC, and adjust for smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(5); // PC: 5
      else if (window.innerWidth >= 768) setItemsPerView(4); // Tablet: 4
      else if (window.innerWidth >= 640) setItemsPerView(3); // Small Tablet: 3
      else if (window.innerWidth >= 480) setItemsPerView(2); // Mobile Landscape: 2
      else setItemsPerView(1); // Mobile Portrait: 1
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle hover start: pause auto-scroll. After 5s continuous hover, advance carousel by 1 card & resume loop.
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setIndex((prev) => {
        const maxIndex = Math.max(0, heroPosts.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);
  };

  // Handle hover leave: resume loop immediately.
  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setIsPaused(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  // Sort by combined views and likes, take top 8
  const sortedPosts = [...posts].sort((a, b) => {
    const scoreA = (a.views || 0) + (a.likes || 0);
    const scoreB = (b.views || 0) + (b.likes || 0);
    return scoreB - scoreA;
  }).slice(0, 8);

  const heroPosts = sortedPosts.map(post => ({
    id: post._id || post.id,
    category: post.category || 'TRENDING',
    title: post.title,
    imageUrl: post.imageUrl || '/images.jpeg',
    views: post.views || 0,
    likes: post.likes || 0,
    author: post.author || 'Editorial Team',
    excerpt: post.excerpt || post.content || ''
  }));

  // Auto-scroll logic for continuous spinning loop (pauses while hovered)
  useEffect(() => {
    if (reduceAnimations || isPaused || heroPosts.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const maxIndex = Math.max(0, heroPosts.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [reduceAnimations, isPaused, heroPosts.length, itemsPerView]);

  // Adjust index if window resizes and current index is out of bounds
  useEffect(() => {
    const maxIndex = Math.max(0, heroPosts.length - itemsPerView);
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
  }, [itemsPerView, heroPosts.length, index]);

  if (heroPosts.length === 0) return null;

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  const Card = ({ post, isLastInView }) => (
    <Link
      to={`/post/${post.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block w-full aspect-[4/5] max-w-xs mx-auto"
    >
      {/* IDLE BASE CARD */}
      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 ease-in-out group-hover:opacity-0" />

        <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-end transition-opacity duration-500 ease-in-out group-hover:opacity-0">
          <span className="self-start px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 sm:mb-3">
            {post.category}
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-white mb-2 sm:mb-3 line-clamp-2 leading-tight tracking-tight">
            {post.title}
          </h3>

          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/70">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{formatNumber(post.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{formatNumber(post.likes)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* HOVER SLIDING CONTENT CONTAINER */}
      {itemsPerView > 1 && (
        <div
          className={`absolute top-0 h-full w-full group-hover:w-[175%] rounded-xl overflow-hidden bg-slate-900 z-30 transition-all duration-500 ease-in-out flex flex-row opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto ${
            isLastInView ? 'right-0' : 'left-0'
          }`}
        >
          {/* If last in view, Content Panel is on the LEFT, Photo on the RIGHT */}
          {isLastInView ? (
            <>
              {/* Content Panel (Left side - slides right into photo section on hover out) */}
              <div className="h-full w-[42.9%] p-3 sm:p-4 flex flex-col justify-between bg-slate-900 text-white overflow-hidden flex-shrink-0 border-r border-gray-800 transition-all duration-500 ease-in-out opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0">
                <div className="space-y-1.5 sm:space-y-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[10px] sm:text-xs text-gray-300 line-clamp-3 sm:line-clamp-4 leading-tight">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-800 flex flex-col gap-1.5 mt-auto">
                  <div className="text-[10px] sm:text-[11px] text-gray-300 font-medium truncate">
                    By <span className="text-white font-bold">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-gray-400 font-bold">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{formatNumber(post.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Part (Right side, aligned with right-0) */}
              <div className="relative h-full w-[57.1%] flex-shrink-0 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
              {/* Photo Part (Left side) */}
              <div className="relative h-full w-[57.1%] flex-shrink-0 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Panel (Right side - slides left into photo section on hover out) */}
              <div className="h-full w-[42.9%] p-3 sm:p-4 flex flex-col justify-between bg-slate-900 text-white overflow-hidden flex-shrink-0 border-l border-gray-800 transition-all duration-500 ease-in-out opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0">
                <div className="space-y-1.5 sm:space-y-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[10px] sm:text-xs text-gray-300 line-clamp-3 sm:line-clamp-4 leading-tight">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-800 flex flex-col gap-1.5 mt-auto">
                  <div className="text-[10px] sm:text-[11px] text-gray-300 font-medium truncate">
                    By <span className="text-white font-bold">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-gray-400 font-bold">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{formatNumber(post.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Link>
  );

  return (
    <div className="w-full mb-12">
      {reduceAnimations ? (
        // Static Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
          {heroPosts.map((post) => (
            <Card key={post.id} post={post} isLastInView={false} />
          ))}
        </div>
      ) : (
        // Rolling Carousel View
        <div className="relative overflow-hidden -mx-3 px-3">
          <motion.div
            className="flex"
            animate={{ x: `-${(index * 100) / itemsPerView}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {heroPosts.map((post, i) => {
              const isLastInView = (i - index) === itemsPerView - 1;
              return (
                <div
                  key={post.id}
                  className="px-3 flex-shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <Card post={post} isLastInView={isLastInView} />
                </div>
              );
            })}
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {Array.from({ length: Math.max(0, heroPosts.length - itemsPerView + 1) }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full overflow-hidden transition-all duration-500 ${
                  i === index
                    ? 'w-10 bg-gray-200 dark:bg-gray-700 opacity-80'
                    : 'w-1.5 bg-gray-300 dark:bg-gray-700 opacity-50'
                }`}
              >
                {i === index && (
                  <motion.div
                    key={`progress-${index}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full bg-blue-600"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
