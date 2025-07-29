import { Stack } from 'expo-router';
import 'react-native-reanimated';
import './globals.css'; // Keep this here - main CSS import
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';
import useCustomFonts from '@/hooks/useFonts';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep showing splash screen
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* This stack are basically the viewable screens in the "app" folder */}
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
    </View>
  );
}
