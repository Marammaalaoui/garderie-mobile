import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <HomeScreen />
    </>
  );
}