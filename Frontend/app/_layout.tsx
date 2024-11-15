import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ReadexPro_200ExtraLight,
  ReadexPro_300Light,
  ReadexPro_400Regular,
  ReadexPro_500Medium,
  ReadexPro_600SemiBold,
  ReadexPro_700Bold,
} from "@expo-google-fonts/readex-pro";
import AoiCryptoLogo from "@/assets/logos/AoiCryptoLogo.svg";
import Setting from "@/assets/icons/system-icons-svg/Setting.svg";
import Profile from "@/assets/icons/system-icons-svg/Profile.svg";
import Header from "@/components/Layouts/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  let [loaded, error] = useFonts({
    ReadexPro_200ExtraLight,
    ReadexPro_300Light,
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom,
          backgroundColor: colors.surface,
        }}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: true,
                headerShadowVisible: false,
                header: ({ options }) => <Header />,
              }}
            />
          </Stack>
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}
