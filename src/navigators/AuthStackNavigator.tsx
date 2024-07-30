import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigator from './TabsNavigator'; 
import ProfileScreen from '../components/ProfileScreen'; // Ensure this file exists

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;