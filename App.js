import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/AuthContext';
import LoginForm from './src/LoginForm';
import DrawerNavigator from './src/DrawerNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false, headerLeft: () => null }} />
            </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
