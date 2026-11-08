'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
    setIsDark(!isDark);
  };

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      <div className="relative">
        <Sun className={`transition-transform duration-500 ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon className={`absolute top-0 left-0 transition-transform duration-500 ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
      </div>
    </Button>
  );
}
