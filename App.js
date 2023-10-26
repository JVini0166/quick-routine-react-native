import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/Login'
import Home from './pages/Home'
import CreateAccount from './pages/CreateAccount'
import CreateHabit from './pages/Habit/CreateHabit'
import HabitFrequency from './pages/Habit/HabitFrequency';
import CreateRevision from './pages/Revision/CreateRevision';
import Pomodoro from './pages/Pomodoro/Pomodoro';
import PomodoroSettings from './pages/Pomodoro/PomodoroSettings';
import EditHabit from './pages/Habit/EditHabit';

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
        name="Pomodoro" 
        component={Pomodoro} 
        options={{ title: 'Pomodoro' }}
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
        <Stack.Screen 
        name="CreateRevision" 
        component={CreateRevision} 
        options={{ title: 'Criar uma revisão' }}
        />
        <Stack.Screen 
        name="PomodoroSettings" 
        component={PomodoroSettings} 
        options={{ title: 'Configuração do Pomodoro' }}
        />
        <Stack.Screen 
        name="EditHabit" 
        component={EditHabit} 
        options={{ title: 'Editar Hábito' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}



export default App;
