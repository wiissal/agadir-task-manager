import React, { useState } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppNavigator isLoggedIn={isLoggedIn} />
  );
}