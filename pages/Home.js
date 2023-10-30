import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import Geral from './Geral/Geral';
import Habit from './Habit/Habit'
import Revision from './Revision/Revision'
import Progress from './Progress/Progress'

const Home = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'geral', title: 'Geral', focusedIcon: 'home', color: '#77b0fc' },
    { key: 'habitos', title: 'Hábitos', focusedIcon: 'format-list-bulleted', color: '#77b0fc' },
    { key: 'revisoes', title: 'Revisões', focusedIcon: 'calendar-check', color: '#77b0fc' },
    { key: 'progresso', title: 'Progresso', focusedIcon: 'chart-line', color: '#0cdca4' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    geral: Geral,
    habitos: () => <Habit navigation={navigation} />,
    revisoes: () => <Revision navigation={navigation} />,
    progresso: () => <Progress navigation={navigation} />,
  });

  return (
    <View style={styles.container}>
      
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Content title="Quick Routine" />
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} />
        <Appbar.Action icon="timer" onPress={() => navigation.navigate('Pomodoro')} />
        <Appbar.Action icon="information" onPress={() => navigation.navigate('Sobre')} />
      </Appbar.Header>
      
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        activeColor="#0cdca4"
        inactiveColor="#77b0fc"
        barStyle={{ backgroundColor: '#048cdc' }}  // This sets the background color for the BottomNavigation
      />
    </View>
  );
};


const RevisoesRoute = () => <Text>Revisões</Text>;
const ProgressoRoute = () => <Text>Progresso</Text>;

const styles = StyleSheet.create({
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
    backgroundColor: '#048cdc'  // This will set the background color of the Appbar.Header
  }
});

export default Home;
