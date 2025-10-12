// src/pages/PortfolioPage.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ProfileImg from '/ProfileImg.jpeg';

function PortfolioPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-white text-gray-900'
      }`}
    >
      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="ProfileImg.jpeg"
          alt="Profile"
          className="rounded-full shadow-lg w-65 h-65 object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1
          className={`text-4xl font-extrabold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          From The Developer
        </h1>
        <p
          className={`text-lg mb-6 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Hello! I'm a passionate and aspiring full-stack developer currently
          honing my skills in creating dynamic and user-friendly web
          applications. My journey in technology is driven by curiosity and a
          desire to build solutions that make an impact. I'm always eager to
          learn new technologies and apply them to real-world challenges.
        </p>
        <p
          className={`text-lg mb-8 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          This section is inspired by my portfolio website, where I showcase
          various projects and delve into the technical intricacies of their
          development. My aim is to deliver intuitive and responsive designs
          that provide excellent user experiences.
        </p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block text-lg font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            theme === 'dark'
              ? 'bg-blue-500 hover:bg-blue-400 text-gray-900'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          View Portfolio
        </a>
      </div>
    </div>
  );
}

export default PortfolioPage;
