import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login'
import Home from './Home'
import CreateAccount from './CreateAccount'
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
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="CreateAccount" 
        component={CreateAccount} 
        options={{ title: 'Crie sua Conta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}



export default App;
