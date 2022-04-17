import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AuthForm from "../components/forAuth/AuthForm";
import RegistrationForm from "../components/forRegistration/RegistrationForm";
import CameraScreen from "../screens/CameraScreen";

const Stack = createStackNavigator();

export  default  function MainNavigate () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        initialRouteName: 'Auth',
        animationEnabled: false,
      }}>
        <Stack.Screen
          name = 'Auth'
          component={AuthForm}
        />
        <Stack.Screen
        name = 'AllCard'
        component={MainScreen} />
        <Stack.Screen
          name = 'Settings'
          component={SettingsScreen} />
        <Stack.Screen
          name = 'Registration'
          component={RegistrationForm} />
        <Stack.Screen
          name = 'Camera'
          component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )}
