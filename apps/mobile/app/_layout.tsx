import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ← 추가

import { useColorScheme } from '@/hooks/use-color-scheme';

const queryClient = new QueryClient(); // ← 추가

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}