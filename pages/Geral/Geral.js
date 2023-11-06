import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HabitCard from '../../components/HabitCard';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../components/colors';
const Geral = () => {
    const [habits, setHabits] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchHabits = async () => {
                let storedHabits = await AsyncStorage.getItem('habits');
                if (storedHabits) {
                    setHabits(JSON.parse(storedHabits));
                }
            };
            fetchHabits();

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
            <ScrollView style={styles.cardsContainer}> {/* Aqui aplicamos o estilo de padding */}
                {habits.map(habit => 
                    <HabitCard key={habit.id} habit={habit} />
                )}
            </ScrollView>
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
