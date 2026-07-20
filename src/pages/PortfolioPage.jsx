// src/pages/PortfolioPage.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ProfileImg from '/ProfileImg.jpeg';

function PortfolioPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen p-4 md:p-12 flex items-center justify-center transition-colors duration-500 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="flex items-start space-x-3 md:space-x-4 max-w-3xl w-full">
        {/* Profile Image - Small and to the left */}
        <div className="flex-shrink-0">
          <img
            src={ProfileImg}
            alt="Profile"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md object-cover border-2 border-white dark:border-gray-700"
          />
        </div>

        {/* Message Box / Content Section */}
        <div
          className={`relative flex-1 p-5 md:p-6 rounded-2xl shadow-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 text-gray-100'
              : 'bg-white text-gray-800 border border-gray-100'
          }`}
        >
          {/* WhatsApp-style bubble tail */}
          <div
            className={`absolute top-4 -left-2 w-4 h-4 rotate-45 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white border-l border-b border-gray-100'
            }`}
          ></div>

          {/* Sender Name (WhatsApp Group style) */}
          <p className={`text-xs font-bold mb-1 uppercase tracking-tight ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            The Developer
          </p>

          <h1 className="text-xl md:text-2xl font-bold mb-3">
            Portfolio Journey
          </h1>

          <div className="space-y-3 text-sm md:text-base leading-relaxed opacity-90">
            <p>
              Hello! I'm a passionate full-stack developer currently
              honing my skills in creating dynamic and user-friendly web
              applications.
            </p>
            <p>
              My journey is driven by curiosity and a desire to build solutions
              that make an impact. I love applying new tech to real-world challenges.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-bold hover:underline ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              View Full Portfolio →
            </a>
            <span className="text-[10px] opacity-50 italic">
              Active now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
