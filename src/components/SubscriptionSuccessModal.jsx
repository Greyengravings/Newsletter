import React, { useEffect } from 'react';

const SubscriptionSuccessModal = ({ isOpen, onClose, email, theme }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-md p-8 md:p-10 rounded-[2.5rem] shadow-2xl transform animate-in zoom-in duration-300 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-blue-50 text-gray-900'
        }`}
      >
        {/* Confetti-like decorative elements */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center relative z-10">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
            theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'
          }`}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-3xl font-black mb-4 tracking-tight">Success!</h3>
          <p className="text-lg opacity-80 mb-8 leading-relaxed">
            Awesome! <span className="font-bold text-blue-600">{email}</span> has been successfully added to our newsletter. Get ready for some amazing content!
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessModal;
