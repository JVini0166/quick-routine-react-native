import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login'
import Home from './Home'
import CreateAccount from './CreateAccount'
import CreateHabit from './CreateHabit'
import HabitFrequency from './HabitFrequency';


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
        <Stack.Screen 
        name="CreateHabit" 
        component={CreateHabit} 
        options={{ title: 'Criar um Hábito' }}
        />
        <Stack.Screen 
        name="HabitFrequency" 
        component={HabitFrequency} 
        options={{ title: 'Selecionar uma Frequência' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}



export default App;
