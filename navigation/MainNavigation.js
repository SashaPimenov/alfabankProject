import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AuthForm from "../components/forAuth/AuthForm";
import RegistrationForm from "../components/forRegistration/RegistrationForm";
import CameraScreen from "../screens/CameraScreen";
import { useAuth } from "../components/forAuth/useAuth";

const Stack = createStackNavigator();

export default function MainNavigate() {
  const auth = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen name={auth.isAuth ? "AllCard" : "Auth"} component={auth.isAuth ? MainScreen : AuthForm} />
        <Stack.Screen name={auth.isAuth ? "Auth" : "AllCard"} component={auth.isAuth ? AuthForm : MainScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Registration" component={RegistrationForm} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
