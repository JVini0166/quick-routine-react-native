import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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
    

    const HabitCard = ({ habit }) => {
        const currentDay = new Date().getDate();

        const handlePress = () => {
            navigation.navigate('EditHabit', habit); // Passa os detalhes do hábito como parâmetros.
        }

        return (
            <TouchableOpacity onPress={handlePress}>
                <Card style={styles.card}>
                    <View style={{flexDirection: 'column', flexGrow: 1}}>
                        <Text>{habit.habit}</Text>
                        <Text>{habit.frequency}</Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            {[...Array(6)].map((_, index) => {
                                const day = currentDay - 5 + index;
                                return (
                                    <View key={index} style={styles.dayBox}>
                                        <Text>{['Seg', 'Ter', 'Quar', 'Quin', 'Sex'][new Date().getDay() - 5 + index]}</Text>
                                        <Text>{day}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    };


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
                onPress={() => navigation.navigate('CreateHabit', {name: 'CreateHabit'})}
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
    dayBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2
    }
})

export default Habit;