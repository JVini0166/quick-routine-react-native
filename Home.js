import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import Geral from './Geral';
import Habit from './Habit'
const Home = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'geral', title: 'Geral', icon: 'home' },
    { key: 'habitos', title: 'Hábitos', icon: 'format-list-bulleted' },
    { key: 'revisoes', title: 'Revisões', icon: 'calendar-check' },
    { key: 'progresso', title: 'Progresso', icon: 'chart-line' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    geral: Geral,
    habitos: () => <Habit navigation={navigation} />,
    revisoes: RevisoesRoute,
    progresso: ProgressoRoute,
  });

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Quick Routine" />
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} />
        <Appbar.Action icon="timer" onPress={() => navigation.navigate('Pomodoro')} />
        <Appbar.Action icon="information" onPress={() => navigation.navigate('Sobre')} />
      </Appbar.Header>



      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
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
});

export default Home;
