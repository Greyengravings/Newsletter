import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import SubscriptionSuccessModal from '../components/SubscriptionSuccessModal';

function SubscribePage() {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');

  // Dynamic stats state
  const [subscribers, setSubscribers] = useState(524);
  const [insights, setInsights] = useState(1150);
  const [updates, setUpdates] = useState(1020);

  useEffect(() => {
    // Even faster interval for a very "live" feeling
    const interval = setInterval(() => {
      // Subscribers: fluctuate up and down
      setSubscribers(prev => prev + (Math.random() > 0.45 ? 1 : -1));

      // Insights: mostly increase, starting from ~1.1k
      setInsights(prev => prev + (Math.random() > 0.3 ? 1 : 0));

      // Updates: mostly increase, starting from ~1k
      setUpdates(prev => prev + (Math.random() > 0.4 ? 1 : 0));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribedEmail(email);
    setIsModalOpen(true);
    setEmail('');
  };

  const stats = [
    { label: 'Active Subscribers', value: subscribers },
    { label: 'Insights Shared', value: insights },
    { label: 'Updates Delivered', value: updates }
  ];

  return (
    <div className={`py-8 md:p-8 min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto text-center mt-12">
        <div className={`inline-block p-4 rounded-full mb-6 ${
          theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
        }`}>
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Join the Newsletter</h1>
        <p className="text-lg opacity-80 mb-12 max-w-2xl mx-auto">
          Get the latest articles, tech tutorials, and project updates delivered directly to your inbox. Stay ahead of the curve with our curated insights.
        </p>

        {/* Subscribe Form Card */}
        <div className={`p-8 md:p-12 rounded-[2.5rem] shadow-2xl mb-16 relative overflow-hidden transition-all duration-500 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-blue-100'
        }`}>
          {/* Subtle background glow for the card */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>

          <h2 className="text-2xl md:text-3xl font-bold mb-8 relative z-10">
            Thousands are already staying ahead.<br className="hidden md:block" />
            <span className="text-blue-600">You should too!</span>
          </h2>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto relative z-10">
            <input
              type="email"
              placeholder="your@email.com"
              required
              className={`flex-1 p-5 rounded-2xl border-2 outline-none focus:ring-4 focus:ring-blue-500/20 transition-all ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-12 py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          <p className="mt-8 text-sm font-medium opacity-50 relative z-10">
            Join a community of enthusiasts. Unsubscribe at any time.
          </p>
        </div>

        {/* Live Metrics Grid - Eye Catchy Blue Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden ${
                theme === 'dark'
                  ? 'bg-blue-900/10 border border-blue-500/20 hover:border-blue-400/50'
                  : 'bg-blue-50/50 border border-blue-100 hover:border-blue-300 shadow-xl shadow-blue-500/5'
              }`}
            >
              {/* Animated background glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur"></div>

              <div className="relative z-10">
                <div className={`text-4xl md:text-5xl font-black mb-3 tabular-nums tracking-tighter ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
                }`}>
                  {stat.value.toLocaleString()}
                </div>
                <div className={`text-xs font-black uppercase tracking-[0.2em] ${
                  theme === 'dark' ? 'text-blue-300/60' : 'text-blue-900/60'
                }`}>
                  {stat.label}
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 -mr-8 -mb-8 bg-blue-600/5 rounded-full transition-transform duration-700 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </div>

      <SubscriptionSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={subscribedEmail}
        theme={theme}
      />
    </div>
  );
}

export default SubscribePage;
