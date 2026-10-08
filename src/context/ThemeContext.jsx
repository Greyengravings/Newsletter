import React, { createContext, useState, useEffect } from 'react';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [reduceBlur, setReduceBlur] = useState(() => {
    return localStorage.getItem('reduceBlur') === 'true';
  });

  const [reduceAnimations, setReduceAnimations] = useState(() => {
    return localStorage.getItem('reduceAnimations') === 'true';
  });

  const [headerLayout, setHeaderLayout] = useState(() => {
    return localStorage.getItem('headerLayout') || 'single';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('reduceBlur', reduceBlur);
  }, [reduceBlur]);

  useEffect(() => {
    localStorage.setItem('reduceAnimations', reduceAnimations);
  }, [reduceAnimations]);

  useEffect(() => {
    localStorage.setItem('headerLayout', headerLayout);
  }, [headerLayout]);

  return (
    <ThemeContext.Provider value={{
      theme, setTheme,
      reduceBlur, setReduceBlur,
      reduceAnimations, setReduceAnimations,
      headerLayout, setHeaderLayout
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
