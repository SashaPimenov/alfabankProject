import React from 'react';
import Tabs from '../navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

export default function Main() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
