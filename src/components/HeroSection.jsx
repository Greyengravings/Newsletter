import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection({ posts }) {
  // Use the first 4 posts from the database for the hero
  const heroPosts = posts.slice(0, 4).map(post => ({
    id: post._id || post.id,
    category: post.category || 'RECENT POST',
    title: post.title,
    imageUrl: post.imageUrl || '/images.jpeg', // fallback image
  }));

  if (heroPosts.length === 0) return null;

  const buttonStyles = "inline-block border-2 border-blue-600 text-white bg-blue-600/50 backdrop-blur-sm px-4 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-sm";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 aspect-[2/3] md:aspect-[16/9] lg:aspect-[21/9]">
        
        {/* Post 1 - Large (2x2) */}
        {heroPosts[0] && (
          <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${heroPosts[0].imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-blue-400 mb-2">{heroPosts[0].category}</span>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-4 line-clamp-2 leading-tight">
                {heroPosts[0].title}
              </h2>
              <div>
                <Link to={`/post/${heroPosts[0].id}`} className={buttonStyles}>
                  Read Blog
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Post 2 - Wide (2x1) */}
        {heroPosts[1] && (
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${heroPosts[1].imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-blue-400 mb-1">{heroPosts[1].category}</span>
              <h3 className="text-base md:text-xl font-bold text-white mb-3 line-clamp-1">{heroPosts[1].title}</h3>
              <div>
                <Link to={`/post/${heroPosts[1].id}`} className={buttonStyles}>
                  Read Blog
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Post 3 - Standard (1x1) */}
        {heroPosts[2] && (
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${heroPosts[2].imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-1">{heroPosts[2].category}</span>
              <h3 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2">{heroPosts[2].title}</h3>
              <Link to={`/post/${heroPosts[2].id}`} className="text-xs font-bold text-blue-400 hover:text-white transition-colors">
                Read More →
              </Link>
            </div>
          </div>
        )}

        {/* Post 4 - Standard (1x1) */}
        {heroPosts[3] && (
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${heroPosts[3].imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-1">{heroPosts[3].category}</span>
              <h3 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2">{heroPosts[3].title}</h3>
              <Link to={`/post/${heroPosts[3].id}`} className="text-xs font-bold text-blue-400 hover:text-white transition-colors">
                Read More →
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default HeroSection;
