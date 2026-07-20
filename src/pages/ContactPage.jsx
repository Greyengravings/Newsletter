import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ContactPage() {
  const { theme } = useContext(ThemeContext);
  const minionImg = `${import.meta.env.BASE_URL}minion.jpg`;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const inputClasses = `w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  return (
    <div className={`p-4 md:p-8 min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto lg:ml-[5%] xl:ml-[10%]">
        {/* Column Division: 12-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* Left Column: Header and Form (Spans 8 columns) */}
          <div className="lg:col-span-8 max-w-3xl">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
              <div className="h-1.5 w-24 bg-blue-600 rounded-full mb-6"></div>
              <p className="text-lg opacity-80 max-w-xl">
                Have a question, feedback, or a specific issue to report? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </header>

            {/* Form Card */}
            <div className={`p-6 md:p-10 rounded-[2.5rem] shadow-2xl transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-blue-50'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold px-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className={inputClasses}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold px-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className={inputClasses}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold px-1 flex justify-between items-center">
                      Phone Number
                      <span className="text-[10px] font-medium uppercase tracking-wider opacity-50">Optional</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClasses}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold px-1">Subject of Issue</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Bug Report, General Inquiry"
                      className={inputClasses}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold px-1">Message</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Describe your issue or message in detail..."
                    className={inputClasses}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-12 opacity-60 text-sm italic">
              <p>Typical response time: Within 24-48 hours.</p>
            </div>
          </div>

          {/* Right Column: Minion (Spans 4 columns) */}
          <div className="hidden lg:flex lg:col-span-4 h-full flex-col justify-end items-start pointer-events-none">
            {/* Height set to 50% of the grid container (which matches the form's height) */}
            <div className="h-1/2 w-full max-w-[280px]">
              <img
                src={minionImg}
                alt="Decorative Minion"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactPage;
