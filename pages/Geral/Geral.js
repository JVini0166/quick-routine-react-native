import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HabitCard from '../../components/HabitCard';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../components/colors';
import DateSlider from '../../components/DateSlider';
import GeralHabitCard from '../../components/GeralHabitCard';
import GeralRoutineCard from '../../components/GeralRoutineCard';
import GeralRevisionCard from '../../components/GeralRevisionCard';
import GeralTaskCard from '../../components/GeralTaskCard';

const Geral = () => {
    const [habits, setHabits] = useState([]);
    const [routines, setRoutines] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [revisions, setRevisions] = useState([]);
    const [tasks, setTasks] = useState([]);

    const getDayOfWeek = (date) => {
        const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        return days[date.getDay()];
    };

    const fetchRevisions = async () => {
        try {
            const storedRevisions = await AsyncStorage.getItem('revisions');
            if (storedRevisions) {
                setRevisions(JSON.parse(storedRevisions));
            }
        } catch (error) {
            console.error('Failed to fetch revisions:', error);
        }
    };

    const fetchRoutines = async () => {
        try {
            const storedRoutines = await AsyncStorage.getItem('routine');
            if (storedRoutines) {
                setRoutines(JSON.parse(storedRoutines));
            }
        } catch (error) {
            console.error('Failed to fetch routines:', error);
        }
    };

    const filteredRoutines = () => {
        const dayOfWeek = getDayOfWeek(selectedDate);
        return routines[dayOfWeek] || []; // Retorna as rotinas para o dia da semana ou um array vazio
    };

    const fetchTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };
    
    useFocusEffect(
        useCallback(() => {
            const fetchHabits = async () => {
                let storedHabits = await AsyncStorage.getItem('habits');
                if (storedHabits) {
                    setHabits(JSON.parse(storedHabits));
                }
            };
            fetchHabits();
            fetchRoutines();
            fetchRevisions();
            fetchTasks(); 

            return () => {
                // Limpar efeitos ou listeners se necessário ao sair da tela.
            };
        }, [])
    );

    return (
        <LinearGradient 
            style={styles.container}
            colors={[colors.primary, colors.secondary]} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >            
            <View style={styles.dateContainer}>
        <DateSlider selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            </View>
            <View style={styles.habitsContainer}>
            <ScrollView style={styles.cardsContainer}> {/* Aqui aplicamos o estilo de padding */}
                {habits.map(habit => 
                    <GeralHabitCard habit={habit} />
                )}
            </ScrollView>
            <ScrollView style={styles.cardsContainer}>
                {filteredRoutines().map(routine => 
                    <GeralRoutineCard key={routine.name} routine={routine} />
                )}
            </ScrollView>
            <ScrollView style={styles.cardsContainer}>
                {revisions.map(revision => 
                    <GeralRevisionCard key={revision.id} revision={revision} />
                )}
            </ScrollView>
            <ScrollView style={styles.cardsContainer}>
                {tasks.map(task => 
                    <GeralTaskCard key={task.id} task={task} />
                )}
            </ScrollView>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Isso garante que o ScrollView não expanda
    },
    contentContainer: {
        alignItems: 'flex-start', // Alinha ao topo
        flexDirection: 'row',
        padding: 10 // Assegura que os itens estejam na horizontal
    },
    cardsContainer: {
        padding: 10, // Isso vai adicionar padding em todos os lados do ScrollView
    },
    dateContainer: {
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
