import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SettingsScreen from '../screens/SettingsScreen';
import MainScreen from '../screens/MainScreen';
import AddCartScreen from '../screens/AddCartScreen';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{display: 'flex', height: responsiveHeight(10)}, null],
        tabBarOptions: [{showLabel: false}],
      }}
      initialRouteName="MainScreen">
      <Tab.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../images/interpreter_img.png')}
                style={{
                  tintColor: focused ? '#ffcc00' : '#000',
                  width: responsiveWidth(11),
                  height: responsiveHeight(11),
                  marginBottom: '5%',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Main'}
        component={MainScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../images/profile_img.png')}
                style={{
                  tintColor: focused ? '#ffcc00' : '#000',
                  width: responsiveWidth(11.5),
                  height: responsiveHeight(11.5),
                  marginBottom: '5%',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Add'}
        component={AddCartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../images/evaluation_img.png')}
                style={{
                  tintColor: focused ? '#ffcc00' : '#000',
                  width: responsiveWidth(11),
                  height: responsiveHeight(11),
                  marginBottom: '5%',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: '#000',
    fontSize: responsiveFontSize(1.5),
    top: -38,
    textAlign: 'center',
  },
});

export default Tabs;
