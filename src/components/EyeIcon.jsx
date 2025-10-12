import React from 'react';

const EyeIcon = ({ isOpen, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2} // Using strokeWidth 2 for a slightly bolder look
    stroke="currentColor"
    className="w-5 h-5 text-gray-500 cursor-pointer"
    onClick={onClick}
  >
    {isOpen ? (
      // Eye-open icon (simple circle and path)
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      // Eye-closed icon (a line through a simpler eye)
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-4.478 0-8.268-2.943-9.542-7 .967-3.05 3.328-5.334 6.177-6.845M12 4.5c4.478 0 8.268 2.943 9.542 7-1.075 3.39-3.417 5.673-6.177 6.845" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1112 12.121" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121L9.879 16.121" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    )}
  </svg>
);

export default EyeIcon;