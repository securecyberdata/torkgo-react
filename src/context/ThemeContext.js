import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to dark theme
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Get saved theme preference from localStorage
      const savedTheme = localStorage.getItem('theme');
      
      // If there's a saved preference, use it; otherwise, keep the default
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Check if user prefers dark mode based on system settings
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to body
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      // Save preference to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      // Save preference to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 