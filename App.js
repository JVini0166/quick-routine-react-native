import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login'
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Quick Routine'}}
        />
        {/* <Stack.Screen name="Profile" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}



export default App;
