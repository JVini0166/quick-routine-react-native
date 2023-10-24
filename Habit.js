import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';


const Habit = ({navigation}) => {

    const [habits, setHabits] = useState([]);
    const [tasks, setTasks] = useState([]);

    const HabitCard = ({ habit }) => (
        <Card style={styles.card}>
            <Text>{habit.name}</Text>
            <Button onPress={() => { /* Logic to mark habit as completed */ }}>Concluir</Button>
        </Card>
    );

    const TaskCard = ({ task }) => (
        <Card style={styles.card}>
            <Text>{task.name}</Text>
            <Button onPress={() => { /* Logic to mark task as completed */ }}>Concluir</Button>
        </Card>
    );


    return (
        <View style={styles.container}>
            {/* ... Rest of the date selection code ... */}
            
            <ScrollView style={styles.cardsContainer}>
                {habits.map(habit => 
                    <HabitCard key={habit.id} habit={habit} />
                )}
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateHabit')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Isso garante que o ScrollView não expanda
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0, // Isso deve empurrar o FAB para o canto inferior
    },
})

export default Habit;