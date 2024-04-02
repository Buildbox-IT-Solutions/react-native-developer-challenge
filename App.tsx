import { Character } from '@api/character/model';
import { ThemeProvider, ThemeProps } from '@contexts/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharacterScreen from '@screens/Character';
import HomeScreen from '@screens/Home';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export type RootStackParamsList = {
  Home: undefined;
  Character: Character;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const theme: ThemeProps = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    barStyle: isDarkMode ? 'light-content' : 'dark-content',
  };

  return (
    <ThemeProvider {...theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: theme.color,
            headerStyle: { backgroundColor: theme.backgroundColor },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Rick and Morty - Personagens' }}
          />
          <Stack.Screen
            name="Character"
            component={CharacterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
