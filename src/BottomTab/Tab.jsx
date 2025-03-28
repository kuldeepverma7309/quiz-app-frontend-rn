import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from '../theme.js'
import Home from '../screens/Home.jsx'
import History from '../screens/History.jsx'
import Profile from '../screens/Profile.jsx'


const Tab = createBottomTabNavigator()
const App = () => {
  return (


      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.activeTabColor,
        tabBarInactiveTintColor: colors.inactiveTabColor,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          shadowOffset: { width: 5, height: 3 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5,
        },
        animation:'shift'
      })}
      >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="History" component={History}/>
        <Tab.Screen name="Profile" component={Profile}/>
      </Tab.Navigator>
  )
}

export default App