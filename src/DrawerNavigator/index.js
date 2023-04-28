// src/DrawerNavigator.js
import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import BottomTabNavigator from '../BottomTabNavigator';
import AuthContext from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Button, Box } from 'native-base';
import { useFonts } from 'expo-font';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { isAuthenticated, user, portfolioInfo, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
    'Lato-Black': require('../../assets/fonts/Lato-Bold.ttf'),
});

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <View>
        {isAuthenticated && user &&  <Box padding="10px"><Text style={{ marginLeft: 16, marginBottom: 16 }} style={{ fontFamily: 'Lato-Regular' }}>{portfolioInfo?.portfolio?.investor?.name || "user"}</Text></Box>}
        <DrawerItemList {...props} />
      </View>
      <View>
        <Button onPress={handleLogout} style={{ backgroundColor: "#D8EEFF", marginLeft: 16, marginRight: 16, marginBottom: 25 }}>
          <Text fontSize='16px' style={{ color: "#0076D3" }} style={{ fontFamily: 'Lato-Regular' }}>Logout</Text>
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeScreen" options={{ title: 'Home' }} component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
