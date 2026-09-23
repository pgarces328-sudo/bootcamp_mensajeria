import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000*60, retry: 1 } } });
export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider><StatusBar style="light" /><AppNavigator /></SafeAreaProvider>
    </QueryClientProvider>
  );
}