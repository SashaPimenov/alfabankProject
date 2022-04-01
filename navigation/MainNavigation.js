import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import AddCardScreen from "../screens/AddCartScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export  default  function MainNavigate () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        initialRouteName: 'AllCard'
      }}>
        <Stack.Screen
        name = 'AllCard'
        component={MainScreen}
        />
        <Stack.Screen
          name = 'AddCard'
          component={AddCardScreen}/>
        <Stack.Screen
          name = 'Settings'
          component={SettingsScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
    )}
