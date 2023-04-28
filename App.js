import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { AuthProvider } from './src/AuthContext';
import LoginForm from './src/LoginForm';
import TransactionHistory from './src/TransactionHistory';
import DrawerNavigator from './src/DrawerNavigator';

import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import * as Font from 'expo-font';
const Stack = createStackNavigator();



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
    });
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
              <Stack.Screen name="HomeStack" component={DrawerNavigator} options={{ headerShown: false, headerLeft: () => null }} />
              <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ title: 'Transaction History', headerBackTitle: null }} />
            </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
