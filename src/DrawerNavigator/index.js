// src/DrawerNavigator.js
import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import BottomTabNavigator from '../BottomTabNavigator';
import AuthContext from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <View>
        <DrawerItemList {...props} />
        {isAuthenticated && user && <Text style={{ marginLeft: 16, marginBottom: 16 }}>{user.name}</Text>}
      </View>
      <View>
        <Button onPress={handleLogout} style={{ backgroundColor: "#D8EEFF", marginLeft: 16, marginRight: 16, marginBottom: 25 }}>
          <Text fontSize='16px' style={{ color: "#0076D3" }}>Logout</Text>
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
