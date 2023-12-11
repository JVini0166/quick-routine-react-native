import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitCard = ({ habit, navigation, onSelect }) => {

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentDayOfWeek = currentDate.getDay();
    const currentDateString = currentDate.toISOString().slice(0, 10);
    const existingDateEntry = habit.history?.find(d => d.date === currentDateString);


    // Se a entrada da data atual existir, defina lastBoxColor de acordo com seu valor
    const initialColor = (existingDateEntry && (
        existingDateEntry.value === 1 ? 'green' :
        existingDateEntry.value === 2 ? 'red' :
        'yellow'
    )) || 'yellow';

    const [lastBoxColor, setLastBoxColor] = useState(initialColor);

    const handleLastBoxClick = async () => {
        let newColorValue;
        if (lastBoxColor === 'yellow') {
            setLastBoxColor('green');
            newColorValue = 1;
        }
        else if (lastBoxColor === 'green') {
            setLastBoxColor('red');
            newColorValue = 2;
        }
        else {
            setLastBoxColor('yellow');
            newColorValue = 0;
        }
    
        // Atualize o histórico do hábito
        const currentDateString = currentDate.toISOString().slice(0, 10);
        const existingDateEntry = habit.history.find(d => d.date === currentDateString);
        if (existingDateEntry) {
            existingDateEntry.value = newColorValue;
        } else {
            habit.history.push({ date: currentDateString, value: newColorValue });
        }
        
        // Atualizar AsyncStorage
        let habits = await AsyncStorage.getItem('habits');
        if (habits) {
            habits = JSON.parse(habits);
            const habitToUpdate = habits.find(h => h.id === habit.id);
            if (habitToUpdate) {
                habitToUpdate.history = habit.history;
                await AsyncStorage.setItem('habits', JSON.stringify(habits));
            }
        }
    };
    

    const getBoxColor = (dateEntry) => {
        if (!dateEntry) return 'yellow';  // Se não encontrar a entrada, a caixa será amarela
    
        switch (dateEntry.value) {
            case 1:
                return 'green';
            case 2:
                return 'red';
            default:
                return 'yellow';  // Para qualquer outro valor ou falta de valor
        }
    };
    
    


    return (
        <TouchableOpacity onPress={onSelect} style={styles.cardTouchable}>
            <Card style={styles.card}>
                <View style={{ flexDirection: 'column', flexGrow: 1, padding: 10 }}>
                    <Text style={styles.habitTitle}>{habit.habit}</Text>
                    <View style={styles.frequencyContainer}>
                        <View style={styles.frequencyBox}>
                            <Text style={styles.frequencyText}>{habit.frequency}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        {[...Array(5)].map((_, index) => {
                            const day = currentDay - 4 + index;
                            const dayOfWeek = (currentDayOfWeek - 4 + index + 7) % 7;  // Adicione essa linha
                            const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
                            const foundDate = (habit.history || []).find(entry => entry.date === dateString);

                            const boxColor = getBoxColor(foundDate);

                            if (index !== 4) {
                                return (
                                    <View key={index} style={[styles.dayBox, { backgroundColor: boxColor }]}>
                                        <Text>{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][dayOfWeek]}</Text>
                                        <Text>{day}</Text>
                                    </View>
                                );
                            }

                            if (index === 4) {
                                return (
                                    <TouchableOpacity key={index} onPress={handleLastBoxClick} style={[styles.dayBox, styles.lastDayBox, { backgroundColor: lastBoxColor }]}>
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

const styles = StyleSheet.create({
    cardTouchable: {
        borderRadius: 5,
    },
    card: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    dayBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    lastDayBox: {
        width: 50,
        height: 50,
        marginRight: 0,
        borderRadius: 12,
    },
    habitTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    frequencyContainer: {
        alignSelf: 'flex-start'
    },
    frequencyBox: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
    },
    frequencyText: {
        fontSize: 14,
    },
});

export default HabitCard;
