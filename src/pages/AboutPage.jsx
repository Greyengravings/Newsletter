import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ProfileImg from '/ProfileImg.jpeg';

function AboutPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-8 rounded-lg shadow-md transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        About This Blog
      </h1>

      {/* ... previous content ... */}
      <p
        className={`text-center mb-8 max-w-3xl mx-auto ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
        }`}
      >
        This project is a modern, full-stack Personal Blog and Content
        Management System (CMS) designed and developed from the ground up. It
        serves as both a functional platform for sharing knowledge and a
        comprehensive showcase of web development skills.
        <br/>
        The primary motivation behind this project was to create a hands-on,
        real-world application to demonstrate a deep understanding of modern
        web technologies.
      </p>

      <p
        className={` text-center mb-8 max-w-3xl mx-auto ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
        }`}
      >
        As a portfolio piece, it aims to:<br />
        Showcase Technical Skills: To apply and exhibit proficiency in the
        complete MERN stack (MongoDB, Express.js, React, Node.js) and modern
        frontend tooling like Vite and Tailwind CSS.<br />
        Document a Learning Journey: To serve as a personal space for
        documenting thoughts, technical tutorials, and project experiences
        encountered as a 5th-semester Computer Engineering student.<br />
        Build a Practical Tool: To move beyond theoretical knowledge by
        building a useful, reusable, and feature-rich application that can be
        deployed and used for actual content creation.
      </p>

      {/* Tech Stack Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Our Technology Stack
        </h2>
        <p
          className={`text-center mb-8 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          This blog is built using a modern and robust full-stack technology
          stack, ensuring a fast, scalable, and delightful user experience.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Frontend Card */}
          <div
            className={`border-t-4 rounded-lg shadow-md p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-blue-400'
                : 'bg-blue-50 border-blue-600'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-800'
              }`}
            >
              Frontend
            </h3>
            <p className={theme === 'dark' ? 'text-gray-300 mb-4' : 'text-gray-700 mb-4'}>
              <strong className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
                Vite + React:
              </strong>{' '}
              Vite is an incredibly fast build tool that provides a rapid
              development experience. React.js is a powerful JavaScript library
              for building dynamic and interactive user interfaces.
            </p>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              <strong className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
                Tailwind CSS:
              </strong>{' '}
              A utility-first CSS framework that allows for rapid UI
              development by composing classes directly in your markup,
              ensuring a consistent and responsive design.
            </p>
          </div>

          {/* Database Card */}
          <div
            className={`border-t-4 rounded-lg shadow-md p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-purple-400'
                : 'bg-purple-50 border-purple-600'
            }`}>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-800'
              }`}>
              Database
            </h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              <strong className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
                MongoDB:
              </strong>{' '}
              A popular NoSQL database that stores data in flexible, JSON-like
              documents. Its schema-less nature and scalability make it an
              excellent choice for modern web apps.
            </p>
            <p
              className={`mt-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              (Will be connected via Mongoose for simplified data modeling)
            </p>
          </div>

          {/* Backend Card */}
          <div
            className={`border-t-4 rounded-lg shadow-md p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-green-400'
                : 'bg-green-50 border-green-600'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-800'
              }`}
            >
              Backend
            </h3>
            <p className={theme === 'dark' ? 'text-gray-300 mb-4' : 'text-gray-700 mb-4'}>
              <strong className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                Node.js:
              </strong>{' '}
              A JavaScript runtime built on Chrome's V8 JS engine. Perfect for
              building fast and scalable apps.
            </p>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              <strong className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                Express.js:
              </strong>{' '}
              A minimalist framework for building REST APIs, handling routes,
              middleware, and server logic.
            </p>
          </div>
        </div>
      </section>

      {/* Creator & Portfolio Section - Responsive Row */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row gap-8 items-start">

        {/* About the Creator Section */}
        <section className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            About the Creator & The Blog's Purpose
          </h2>

          <div
            className={`space-y-6 leading-relaxed text-center md:text-left ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
            }`}>
            <p>
              This personal blog & CMS was conceptualized and developed by Hitesh
              Nihalani from the IT Dept. at VESIT, Chembur, Mumbai.
            </p>
            <p>
              The entire frontend UI, from initial setup to current design, was
              built iteratively over 2-3 days of learning and implementation.
            </p>
            <p>
              This blog serves as a personal repository for thoughts, tutorials,
              project showcases, and learning experiences — aiming to share
              knowledge and inspire fellow students and enthusiasts.
            </p>
          </div>
        </section>

        {/* Developer Portfolio Section (WhatsApp Style) */}
        <section id="portfolio" className="flex-1 flex justify-center md:justify-end">
          <div className="flex items-start space-x-3 md:space-x-4 w-full max-w-lg">
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
        </section>
      </div>
    </div>
  );
}

export default AboutPage;