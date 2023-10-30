import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HabitCard from '../../components/HabitCard';


const Habit = ({navigation}) => {

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
        <View style={styles.container}>
            {/* ... Rest of the date selection code ... */}
            
            <ScrollView style={styles.cardsContainer}>
                {habits.map(habit => 
                    <HabitCard key={habit.id} habit={habit} navigation={navigation} />
                )}
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateHabit', {name: 'CreateHabit'})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default Habit;