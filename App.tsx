
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import GuestHome from './src/screens/GuestHome';
import GuardFill from './src/screens/GuardFill'

const Stack = createNativeStackNavigator();


const GuestStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='GuestHome' component={GuestHome}></Stack.Screen>
  </Stack.Navigator>
)



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name='GuardFill' component={GuardFill}></Stack.Screen> */}
        <Stack.Screen name=':' component={GuestStack}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
