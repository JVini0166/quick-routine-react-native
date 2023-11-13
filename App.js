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
import CreateRevisionTemplate from './pages/Revision/CreateRevisionTemplate';
import HabitProgress from './pages/Habit/HabitProgress'
import RevisionProgress from './pages/Revision/RevisionProgress'
import Perfil from './pages/Perfil/Perfil'
import RoutineConfig from './pages/RoutineConfig/RoutineConfig';
import RoutineIntervals from './pages/RoutineConfig/RoutineIntervals';
import CreateRoutineItem from './pages/Routine/CreateRoutineItem';
import RoutineItemFrequency from './pages/Routine/RoutineItemFrequency';
import CreateTask from './pages/Tasks/CreateTask';
import EditTask from './pages/Tasks/EditTask';

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
        <Stack.Screen 
        name="CreateRevisionTemplate" 
        component={CreateRevisionTemplate} 
        options={{ title: 'Criar Template de Revisão' }}
        />
        <Stack.Screen 
        name="HabitProgress" 
        component={HabitProgress} 
        options={{ title: 'Ver Progresso' }}
        />
        <Stack.Screen 
        name="RevisionProgress" 
        component={RevisionProgress} 
        options={{ title: 'Ver Progresso' }}
        />
        <Stack.Screen 
        name="Perfil" 
        component={Perfil} 
        options={{ title: 'Perfil' }}
        />
        <Stack.Screen 
        name="RoutineConfig" 
        component={RoutineConfig} 
        options={{ title: 'Config. da Rotina' }}
        />
        <Stack.Screen 
        name="RoutineIntervals" 
        component={RoutineIntervals} 
        options={{ title: 'Intervalos de Rotina' }}
        />
        <Stack.Screen 
        name="CreateRoutineItem" 
        component={CreateRoutineItem} 
        options={{ title: 'Criar Item de Rotina' }}
        />
        <Stack.Screen 
        name="RoutineItemFrequency" 
        component={RoutineItemFrequency} 
        options={{ title: 'Frequência da Rotina' }}
        />
        <Stack.Screen 
        name="CreateTask" 
        component={CreateTask} 
        options={{ title: 'Criar Tarefa' }}
        />
        <Stack.Screen 
        name="EditTask" 
        component={EditTask} 
        options={{ title: 'Editar Tarefa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}



export default App;
