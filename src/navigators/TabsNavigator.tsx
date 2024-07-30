import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import EmailLoginScreen from '../components/EmailLoginScreen';
import PhoneLoginScreen from '../components/PhoneLoginScreen';

const Tab = createMaterialTopTabNavigator();

const TabsNavigator  = () => {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>
        <Tab.Navigator
        
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused, color }) => {
            const label = route.name.charAt(0).toUpperCase() + route.name.slice(1).toLowerCase();
            return <Text style={{ color, fontSize: 18 }}>{label}</Text>;
          },
          tabBarActiveTintColor: '#000', // Color of the active tab text
          tabBarInactiveTintColor: '#000',
          tabBarIndicatorStyle: {
            backgroundColor: '#7ce4f2', // Color of the indicator (line below the active tab)
          },
        })}
        >
          <Tab.Screen name="Email" component={EmailLoginScreen} />
          <Tab.Screen name="Phone" component={PhoneLoginScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  header: {
    marginLeft: 0,
    marginVertical: 30,
  },
  headerText: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'medium',
  },
});

export default TabsNavigator ;
