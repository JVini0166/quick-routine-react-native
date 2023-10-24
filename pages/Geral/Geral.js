import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Card, FAB } from 'react-native-paper';

const Geral = () => {
    const today = new Date();
    const daysOfWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];

    const [habits, setHabits] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [selectedDate, setSelectedDate] = useState(today);

    const week = generateWeek(today);

    function generateWeek(referenceDate) {
        let dates = [];
        for (let i = -3; i <= 3; i++) {
            let tempDate = new Date(referenceDate);
            tempDate.setDate(referenceDate.getDate() + i);
            dates.push(tempDate);
        }
        return dates;
    }

    const [buttonState, setButtonState] = useState('question'); // 'question', 'check', 'close'
    
    const handleButtonClick = () => {
        if (buttonState === 'question') setButtonState('check');
        else if (buttonState === 'check') setButtonState('close');
        else setButtonState('question');
    };


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
                {tasks.map(task => 
                    <TaskCard key={task.id} task={task} />
                )}
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Isso garante que o ScrollView não expanda
    },
    contentContainer: {
        alignItems: 'flex-start', // Alinha ao topo
        flexDirection: 'row', // Assegura que os itens estejam na horizontal
    },
    dateContainer: {
        width: 50,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    dayOfWeek: {
        marginBottom: 5,
    },
    dateBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    selectedDate: {
        borderColor: 'blue',
        backgroundColor: 'lightblue',
    },
    dateText: {
        fontWeight: 'bold',
    },
    
    // Card

    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    habitName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    daysContainer: {
        flexDirection: 'row',
    },
    dayText: {
        marginRight: 5,
    },
    todayIndicator: {
        width: 60,
        marginVertical: 8, // Espaço ao redor do dia atual verticalmente
        marginRight: 10, // Espaço à direita do dia atual
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    todayText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dayBox: {
        marginRight: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
    },
    todayButton: {
        width: 50,
        height: 50,
        borderRadius: 25, // Para tornar círculo
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
});

export default Geral;
