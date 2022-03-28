import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Image} from 'react-native';
import {
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
        tabBarStyle: [
          {display: 'flex', height: responsiveHeight(8.5), borderRadius: 10},
          null,
        ],
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
                source={require('../images/settings.png')}
                style={{
                  tintColor: focused ? '#ffcc00' : '#000',
                  width: responsiveWidth(9),
                  height: responsiveHeight(5),
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
                source={require('../images/creditCard.png')}
                style={{
                  tintColor: focused ? '#ffcc00' : '#000',
                  width: responsiveWidth(11),
                  height: responsiveHeight(6),
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
                source={require('../images/addCard.png')}
                style={{
                  tintColor: focused ? '#ffcc00' : '#000',
                  width: responsiveWidth(9),
                  height: responsiveHeight(5),
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
