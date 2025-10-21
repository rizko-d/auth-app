'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check initial theme
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = storedTheme === 'dark' || (!storedTheme && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    
    // Apply theme immediately
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    console.log('Toggle clicked, current isDark:', isDark); // Debug log
    
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      console.log('Switching to DARK mode'); // Debug log
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      console.log('Switching to LIGHT mode'); // Debug log
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="text-xl">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
