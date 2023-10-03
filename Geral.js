import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Geral = () => {
    const today = new Date();
    const daysOfWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];

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


    const HabitCard = ({ habitName }) => {
        const buttonColors = {
            question: 'yellow',
            check: 'green',
            close: 'red'
        };

        return (
            <View style={styles.card}>
                <View style={styles.leftContainer}>
                    <Text style={styles.habitName}>{habitName}</Text>
                    <View style={styles.daysContainer}>
                        {week.slice(0, 4).map((date, index) => (
                            <View 
                                key={index} 
                                style={[
                                    styles.dayBox, 
                                    index === 3 ? { borderColor: buttonColors[buttonState] } : {}
                                ]}
                            >
                                <Text style={styles.dayText}>
                                    {daysOfWeek[date.getDay()]}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <TouchableOpacity 
                    style={[styles.todayButton, { backgroundColor: buttonColors[buttonState] }]}
                    onPress={handleButtonClick}
                >
                    <MaterialIcons name={buttonState} size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.dateScrollContainer}
                contentContainerStyle={styles.contentContainer}
            >
            {week.map((date, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedDate(date)}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dayOfWeek}>
                            {daysOfWeek[date.getDay()]}
                        </Text>
                        <View style={[
                            styles.dateBox, 
                            selectedDate.getDate() === date.getDate() && styles.selectedDate
                        ]}>
                            <Text style={styles.dateText}>
                                {date.getDate()}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
        <View style={styles.cardsContainer}>
                {[1, 2, 3, 4, 5].map(num => (
                    <HabitCard key={num} habitName={`Hábito ${num}`} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 0, // Isso garante que o ScrollView não expanda
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
