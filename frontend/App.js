import React, { useState, useEffect } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const [isSplashLoading, setIsSplashLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashLoading(false);
    }, 3000);
  }, []);

  return (
    <AppNavigator 
      isSplashLoading={isSplashLoading} 
      isLoggedIn={isLoggedIn} 
    />
  );
}