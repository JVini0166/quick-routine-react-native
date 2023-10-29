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
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentDayOfWeek = currentDate.getDay();
        const [lastBoxColor, setLastBoxColor] = useState('yellow');
    
        const handleLastBoxClick = () => {
            if (lastBoxColor === 'yellow') setLastBoxColor('green');
            else if (lastBoxColor === 'green') setLastBoxColor('red');
            else setLastBoxColor('yellow');
        }
    
        return (
            <TouchableOpacity onPress={() => navigation.navigate('EditHabit', habit)} style={styles.cardTouchable}>
            <Card style={styles.card}>
                <View style={{flexDirection: 'column', flexGrow: 1, padding: 10}}> {/* Adicionado padding */}
                    <Text style={styles.habitTitle}>{habit.habit}</Text>
                    <View style={styles.frequencyContainer}>
                        <View style={styles.frequencyBox}>
                            <Text style={styles.frequencyText}>{habit.frequency}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                            {[...Array(5)].map((_, index) => {
                                const day = currentDay - 4 + index;
                                const dayOfWeek = (currentDayOfWeek - 4 + index + 7) % 7;
    
                                if (index !== 4) {
                                    return (
                                        <View key={index} style={styles.dayBox}>
                                            <Text>{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][dayOfWeek]}</Text>
                                            <Text>{day}</Text>
                                        </View>
                                    );
                                }
    
                                if (index === 4) {
                                    return (
                                        <TouchableOpacity key={index} onPress={handleLastBoxClick} style={[styles.dayBox, styles.lastDayBox, {backgroundColor: lastBoxColor}]}>
                                            <Text>{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][dayOfWeek]}</Text>
                                            <Text>{day}</Text>
                                        </TouchableOpacity>
                                    );
                                }
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
    cardTouchable: {
        borderRadius: 5, // Adiciona a mesma borda arredondada do Card para manter o mesmo visual
    },
    dayBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
        borderRadius: 10,  // Adiciona bordas arredondadas
        elevation: 2,     // Adiciona uma leve sombra para Android
        shadowColor: "#000", // Configuração de sombra para iOS
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    lastDayBox: {
        width: 50,  // Making it larger
        height: 50, // Making it larger
        marginRight: 0, // Ensure it's on the far right
        borderRadius: 12,  // Adiciona bordas mais arredondadas
    },
    innerLastBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    habitTitle: {
        fontSize: 18,      // Tamanho da fonte maior
        fontWeight: 'bold', // Negrito
        marginBottom: 5,   // Espaço entre o título e o próximo elemento
    },
    frequencyContainer: {
        alignSelf: 'flex-start' // Isso fará com que o container do frequencyBox se ajuste ao seu conteúdo
    },
    frequencyBox: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,  // Espaço entre a frequência e o próximo elemento
    },
    frequencyText: {
        fontSize: 14,
    },
})

export default Habit;