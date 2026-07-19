import { useEffect, useRef } from 'react';
import axios from 'axios';

export default function useIdleTimeout(isLoggedIn, logout) {
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
        await axios.post(`${apiUrl}/admin/logout`);
      } catch (error) {
        console.error('Logout API error:', error);
      }
      logout();
    }, 15 * 60 * 1000); // 15 minutes
  };

  useEffect(() => {
    if (!isLoggedIn) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    const handleActivity = () => resetTimer();

    events.forEach(event => document.addEventListener(event, handleActivity));

    resetTimer(); // start timer

    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoggedIn, logout]);
}
