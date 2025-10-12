import React, { useState, useEffect } from 'react';

const titles = [
  "The Byte-Sized",
  "The Developer's",
  "Full Stack Chronicles",
  "The Digital Canvas",
  "The Student Coder's",
];

function AnimatedTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    const handleTyping = () => {
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      } else {
        if (displayedText.length < currentTitle.length) {
          setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  return (
    // Changed text color to blue and cursor to blue
    <span className="flex items-center text-2xl font-bold">
      <span className="text-blue-600">{displayedText}</span>
      <span className="blinking-cursor h-7 w-[1px] bg-blue-600 ml-1"></span>
      <span className="ml-2 text-black-1000">Blog</span> 
    </span>
  );
}

export default AnimatedTitle;