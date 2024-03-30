import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryclient } from './queryClient';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryclient}>
        <PaperProvider>
          <StatusBar style="auto" />
          <Routes />
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

