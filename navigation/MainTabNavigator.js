import React from 'react';
import { Platform } from 'react-native';
import {  NavigationContainer  } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PricingScreen from  '../screens/PricingScreen';
import AboutScreen from '../screens/AboutScreen';
import DescribeIssueScreen from '../screens/DescribeIssueScreen';
import SymptomsOneScreen from '../screens/SymptomsOneScreen';
import SolutionScreen from '../screens/SolutionScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Describe: HomeScreen,
  Details: SymptomsOneScreen,
  Solution: SolutionScreen
});

HomeStack.navigationOptions = {
  //tabBarLabel: '',
  
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : ''}`
          : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  Describe: HomeScreen,
  Details: SymptomsOneScreen,
  Solution: SolutionScreen
});

LinksStack.navigationOptions = {
  //tabBarLabel: '',
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
    />
  ),
};

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
//   Describe: DescribeIssueScreen,
//   Details: SymptomsOneScreen,
//   Solution: SolutionScreen
// });

// SettingsStack.navigationOptions = {
//   //tabBarLabel: '',
//   tabBarOptions: {
//     showLabel: false
//   },
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-browsers' : 'ios-browsers-outline'}
//     />
//   ),
// };

// const PricingStack = createStackNavigator({
//   Pricings: PricingScreen,
//   Describe: DescribeIssueScreen,
//   Details: SymptomsOneScreen,
//   Solution: SolutionScreen
// });

// PricingStack.navigationOptions = {
//   //tabBarLabel: '',
//   tabBarOptions: {
//     showLabel: false
//   },
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-card' : 'ios-card-outline'}
//     />
//   ),
// };

const AboutStack = createStackNavigator({
  Abouts: AboutScreen,
  Describe: HomeScreen,
  Details: SymptomsOneScreen,
  Solution: SolutionScreen
});

AboutStack.navigationOptions = {
  //tabBarLabel: '',
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'ios-card-book'}
    />
  ),
};


export default createBottomTabNavigator({
  AboutStack,
  LinksStack,
  HomeStack,
  //SettingsStack,
  //PricingStack,
  
});


