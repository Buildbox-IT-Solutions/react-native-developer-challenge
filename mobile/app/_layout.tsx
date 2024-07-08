import React, { useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './HomeScreen/index';
import InformationsScreen from './InformationsScreen/index';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="InformationsScreen"
          component={InformationsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
