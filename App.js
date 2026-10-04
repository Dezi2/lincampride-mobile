import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import { colors } from './src/theme';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import FindRideScreen from './src/screens/FindRideScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const SCREENS = {
  splash: SplashScreen,
  login: LoginScreen,
  menu: MenuScreen,
  dashboard: DashboardScreen,
  rides: FindRideScreen,
  weather: WeatherScreen,
  profile: ProfileScreen,
};

export default function App() {
  // Simple navigation stack: the last item is the screen being shown.
  const [stack, setStack] = useState(['splash']);
  const route = stack[stack.length - 1];

  const navigate = useCallback((r) => setStack((s) => (s[s.length - 1] === r ? s : [...s, r])), []);
  const goBack = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), []);
  const goMenu = useCallback(() => setStack(['menu']), []);
  const onLogin = useCallback(() => setStack(['menu']), []);
  const signOut = useCallback(() => setStack(['login']), []);

  useEffect(() => {
    const timer = setTimeout(() => setStack(['login']), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (route === 'menu' || route === 'splash' || route === 'login') return false;
      goBack();
      return true;
    });
    return () => sub.remove();
  }, [route, goBack]);

  const Current = SCREENS[route];

  return (
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <StatusBar style="light" />
        <Current navigate={navigate} goBack={goBack} goMenu={goMenu} onLogin={onLogin} signOut={signOut} />
      </View>
    </AppProvider>
  );
}