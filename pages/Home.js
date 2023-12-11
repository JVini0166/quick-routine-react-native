import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation, Drawer } from 'react-native-paper';
import Geral from './Geral/Geral';
import Habit from './Habit/Habit'
import Revision from './Revision/Revision'
import Routine from './Routine/Routine'
import colors from '../components/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tasks from './Tasks/Tasks';
import { useNavigation, useIsFocused } from '@react-navigation/native';


const Home = ({ navigation }) => {

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userName, setUserName] = useState('');

    

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  useEffect(() => {
    const loadUserInfo = async () => {
        const storedUserInfo = await AsyncStorage.getItem('userinfo');
        if (storedUserInfo) {
            const { name } = JSON.parse(storedUserInfo);
            if (name) {
                setUserName(name);
            }
        }
    };
    const checkAndSyncData = async () => {
        try {
            const storedState = await AsyncStorage.getItem('state');
            let state = storedState ? JSON.parse(storedState) : null;
            
            if (!state) {
                state = {
                    dataChanged: false,
                    lastSync: new Date().toISOString(),
                };
                await AsyncStorage.setItem('state', JSON.stringify(state));
            }

            const lastSyncTime = new Date(state.lastSync);
            const fiveMinutesAgo = new Date(new Date().getTime() - (5 * 60000));

            if (state.dataChanged && lastSyncTime < fiveMinutesAgo) {
                await pushDataToServer(); // Função para enviar dados ao servidor
            } else if (!state.dataChanged && lastSyncTime < fiveMinutesAgo) {
                await pullDataFromServer(); // Função para receber dados do servidor
            }
        } catch (error) {
            console.error("Erro ao sincronizar dados:", error);
        }
    };

    loadUserInfo();
    checkAndSyncData();
}, []);

const pushDataToServer = async () => {
    // Implemente a lógica de push aqui
};

const pullDataFromServer = async () => {
    // Implemente a lógica de pull aqui
};

// Função para lidar com o logout
const handleLogout = async () => {
  try {
      // Remover os dados do usuário e o token do AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userinfo');
      await AsyncStorage.removeItem('state');

      // Navegar para a tela de Login
      setTimeout(() => {
        // Navegar para a tela de Login após o atraso
        navigation.navigate('Login');
    }, 3000);
  } catch (error) {
      console.error("Erro ao realizar logout:", error);
  }
};


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'geral', title: 'Geral', focusedIcon: 'home', color: '#77b0fc' },
    { key: 'routine', title: 'Rotina', focusedIcon: 'book', color: '#0cdca4' },
    { key: 'habitos', title: 'Hábitos', focusedIcon: 'trending-up', color: '#77b0fc' },
    { key: 'revisoes', title: 'Revisões', focusedIcon: 'calendar-check', color: '#77b0fc' },
    { key: 'tarefas', title: 'Tarefas', focusedIcon: 'format-list-checkbox', color: '#77b0fc' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    geral: () => <Geral navigation={navigation} />,
    routine: () => <Routine navigation={navigation} />,
    habitos: () => <Habit navigation={navigation} />,
    revisoes: () => <Revision navigation={navigation} />,
    tarefas: () => <Tasks navigation={navigation} />,
  });

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Action 
          icon="menu" 
          onPress={() => setDrawerVisible(!drawerVisible)} 
          color={colors.primary} 
        />
        <Appbar.Content title="Quick Routine" color={colors.primary} />
        <Appbar.Action icon="timer" onPress={() => navigation.navigate('Pomodoro')} color={colors.primary} />
      </Appbar.Header>

      {drawerVisible && (
            <Drawer.Section>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Bem-vindo {userName || '!'}</Text>
                </View>
                <Drawer.Item 
                    label="Perfil"
                    onPress={() => navigation.navigate('Perfil')}
                />
                <Drawer.Item 
                    label="Relatório"
                    onPress={() => navigation.navigate('Relatorio')}
                />
                <Drawer.Item 
                    label="Comunidade"
                    onPress={() => navigation.navigate('Comunidade')}
                />
                <Drawer.Item 
                    label="Config. da Rotina"
                    onPress={() => navigation.navigate('RoutineConfig')}
                />
                <Drawer.Item 
                    label="Sair"
                    onPress={handleLogout}
                />
            </Drawer.Section>
      )}

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        activeColor="#77b0fc"
        inactiveColor="#77b0fc"
        barStyle={{ backgroundColor: colors.background }}
      />
    </View>
  );
};


const RevisoesRoute = () => <Text>Revisões</Text>;
const RoutineRoute = () => <Text>Rotina</Text>;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center', // Centraliza horizontalmente
    padding: 10,
  },
  titleText: {
    fontSize: 18, // Ajuste o tamanho da fonte conforme necessário
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  gradient: {
    flex: 1
  },
  appbarHeader: {
    backgroundColor: colors.background  // Atualizando para usar a cor do objeto importado
}
});

export default Home;
