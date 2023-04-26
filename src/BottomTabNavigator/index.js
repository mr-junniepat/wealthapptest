// src/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      {/* Add other screens to the bottom tab navigator */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
