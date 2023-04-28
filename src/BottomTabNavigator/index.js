// src/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../Home';
import History from '../History'; // Import your History screen component
import Profile from '../Profile'; // Import your Profile screen component
import Portfolio from '../Portfolio'; // Import your Portfolio screen component



const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
    //   {/* Add other screens to the bottom tab navigator */}
    // </Tab.Navigator>

    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Portfolio') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}  />
      <Tab.Screen name="History" component={History} options={{ headerShown: false }}  />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Tab.Screen name="Portfolio" component={Portfolio} options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
