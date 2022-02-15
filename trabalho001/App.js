import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Email from './screens/Email';
import Emails from './screens/Emails';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Emails' component={Emails} options={{ headerShown: false }} />
        <Stack.Screen name='Email' component={Email} options={{
          headerStyle: {
            backgroundColor: '#333',
            shadowColor: 'transparent',
          },
          headerBackTitleVisible: false,
          headerTitle: '',
          headerBackTitle: '',
          headerTintColor: '#fff',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
