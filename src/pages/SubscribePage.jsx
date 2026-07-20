import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function SubscribePage() {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Success! ${email} has been added to our newsletter.`);
    setEmail('');
  };

  return (
    <div className={`p-8 min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-xl mx-auto text-center mt-12">
        <div className={`inline-block p-4 rounded-full mb-6 ${
          theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
        }`}>
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">Join the Newsletter</h1>
        <p className="text-lg opacity-80 mb-8">
          Get the latest articles, tech tutorials, and project updates delivered directly to your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            required
            className={`flex-1 p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-sm opacity-60">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

export default SubscribePage;
