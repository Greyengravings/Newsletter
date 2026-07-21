import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';

function HeroSection({ posts }) {
  const { theme, reduceAnimations } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Update itemsPerView based on window width to match the grid layout logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    likes: post.likes || 0
  }));

  // Auto-scroll logic for carousel
  useEffect(() => {
    if (reduceAnimations || heroPosts.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const maxIndex = heroPosts.length - itemsPerView;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000); // 4 seconds interval with a "slight pause" (transition is 0.8s)

    return () => clearInterval(interval);
  }, [reduceAnimations, heroPosts.length, itemsPerView]);

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

  const Card = ({ post }) => (
    <Link
      to={`/post/${post.id}`}
      className="group relative overflow-hidden rounded-[2.5rem] shadow-xl border-2 border-gray-200 dark:border-gray-800 aspect-[4/5] flex flex-col justify-end transition-all duration-500 hover:border-blue-500/50 w-full"
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      <div className="relative z-10 p-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-4">
          {post.category}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-white mb-4 line-clamp-2 leading-tight tracking-tight group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-white/70">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{formatNumber(post.views)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{formatNumber(post.likes)}</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full mb-12">
      {reduceAnimations ? (
        // Static Grid View (matches the layout exactly when animations are off)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {heroPosts.map((post) => (
            <Card key={post.id} post={post} />
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
            {heroPosts.map((post) => (
              <div
                key={post.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <Card post={post} />
              </div>
            ))}
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: Math.max(0, heroPosts.length - itemsPerView + 1) }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full overflow-hidden transition-all duration-500 ${
                  i === index
                    ? 'w-10 bg-gray-200 dark:bg-gray-800'
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
