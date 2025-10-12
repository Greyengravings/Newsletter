import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const AnimatedLoading = () => {
  const { theme } = useContext(ThemeContext);
  const messages = ["Loading blogs", "Preparing content", "Almost ready", "Final touches", "Complete"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dashOffset, setDashOffset] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setDashOffset(prev => {
        const newOffset = prev - 15; // Smoother, smaller increments
        if (newOffset <= 10) {
          // Trigger collision effect when it resets
          const spark = document.querySelector('.collision-spark');
          if (spark) {
            spark.style.animation = 'none';
            setTimeout(() => {
              spark.style.animation = 'collision-burst 4s ease-in-out infinite';
            }, 10);
          }
          return 1165;
        }
        return newOffset;
      });
    }, 80); // Slightly faster for smoother animation

    return () => clearInterval(animationInterval);
  }, []);

  const renderPortfolioLoader = () => {
    return (
      <div className="mt-8 flex justify-center">
        <div className="relative">
          <svg
            className="pl smooth-loader"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pl-grad-blue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <circle
              className="pl__ring"
              r="56"
              cx="64"
              cy="64"
              fill="none"
              stroke="hsla(0,10%,10%,0.1)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              className="pl__worm"
              d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
              fill="none"
              stroke="url(#pl-grad-blue)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="44 1111"
              strokeDashoffset={dashOffset}
            />
          </svg>

          {/* Collision effect overlay */}
          <div className="collision-spark" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className={`text-center transition-opacity duration-500 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <p className="text-lg font-medium mb-4">{messages[currentIndex]}</p>
        {renderPortfolioLoader()}
      </div>
    </div>
  );
};

export default AnimatedLoading;
