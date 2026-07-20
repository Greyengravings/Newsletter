import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SocialIcon from './SocialIcon';
import AnimatedTitle from './AnimatedTitle';
import { ThemeContext } from '../context/ThemeContext';
import SubscriptionSuccessModal from './SubscriptionSuccessModal';

function Footer() {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribedEmail(email);
    setIsModalOpen(true);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="w-[95%] md:max-w-[90%] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Column 1: The Developer's Blog */}
          <div className="flex flex-col col-span-2 lg:col-span-4 lg:pr-8">
            <div className="mb-4">
              <Link to="/">
                <AnimatedTitle isDark={true} />
              </Link>
            </div>
            <p className="text-white mb-6 text-sm leading-relaxed opacity-90">
              A dedicated space where I share my professional journey, creative thoughts, and deep technical insights on modern software development. Explore a world of code, design, and innovation.
            </p>
            <ul className="flex space-x-4 items-center">
              <SocialIcon social="linkedin" tooltip="LinkedIn" href="https://www.linkedin.com/in/hitesh-nihalani/" size="md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
                  <rect width="16" height="16" className="fill-blue-600 group-hover:fill-white transition-colors duration-300" rx="3" ry="3" />
                  <path className="fill-white group-hover:fill-blue-600 transition-colors duration-300" d="M4.943 13.394V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </SocialIcon>
              <SocialIcon social="github" tooltip="GitHub" href="https://github.com/Greyengravings" size="md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
              </SocialIcon>
              <SocialIcon social="instagram" tooltip="Instagram" href="https://www.instagram.com/hitesh_nihalani.15" size="md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="url(#instagramGradient)" className="group-hover:fill-white transition-colors duration-300" viewBox="0 0 16 16">
                  <defs>
                    <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f09433' }} />
                      <stop offset="25%" style={{ stopColor: '#e6683c' }} />
                      <stop offset="50%" style={{ stopColor: '#dc2743' }} />
                      <stop offset="75%" style={{ stopColor: '#cc2366' }} />
                      <stop offset="100%" style={{ stopColor: '#bc1888' }} />
                    </linearGradient>
                  </defs>
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
              </SocialIcon>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center text-center col-span-1 lg:col-span-2 lg:px-4">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <nav className="flex flex-col space-y-3 items-center">
              <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">Home</Link>
              <Link to="/explore" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">Explore</Link>
              <Link to="/categories" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">Categories</Link>
              <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">Contact</Link>
            </nav>
          </div>

          {/* Column 3: Security */}
          <div className="flex flex-col items-center text-center col-span-1 lg:col-span-2 lg:px-4">
            <h2 className="text-xl font-bold mb-4">Security</h2>
            <nav className="flex flex-col space-y-3 items-center">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">Data Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">Terms of Use</Link>
              <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">Report problem</Link>
            </nav>
          </div>

          {/* Column 4: Subscribe Blog */}
          <div className="flex flex-col col-span-2 lg:col-span-4">
            <h2 className="text-xl font-bold mb-4">Subscribe Blog</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Get the latest posts and updates delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
              <div className="relative">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider and Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} The Developer's Blog. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-8">
            <a href="mailto:nihalanihitesh13@gmail.com" className="hover:text-white transition-colors duration-300">Contact Support</a>
            <Link to="/about" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <SubscriptionSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={subscribedEmail}
        theme={theme}
      />
    </footer>
  );
}

export default Footer;