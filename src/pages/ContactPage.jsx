import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ContactPage() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`p-8 min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Contact Us</h1>
        <p className="text-center mb-8 opacity-80">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              required
              className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
              }`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
              }`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              required
              rows="5"
              className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
              }`}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-[1.02]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
