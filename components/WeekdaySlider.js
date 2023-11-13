import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const WeekdaySlider = ({ onDaySelect }) => {
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const [selectedDay, setSelectedDay] = useState('');

    useEffect(() => {
        const today = new Date();
        // Ajuste para o fuso horário de Brasília
        today.setHours(today.getHours() - 3);
        const dayIndex = today.getDay();
        const dayName = weekdays[dayIndex];
        setSelectedDay(dayName);
        onDaySelect(dayName);
    }, [onDaySelect]);

    const WeekdayBox = ({ day }) => {
        const isSelected = day === selectedDay;
        return (
            <TouchableOpacity
                style={[styles.weekdayBox, isSelected && styles.selectedBox]}
                onPress={() => {
                    setSelectedDay(day);
                    onDaySelect(day);
                }}
            >
                <Text>{day}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView
            horizontal={true}
            style={styles.weekdayContainer}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
        >
            {weekdays.map((day, index) => (
                <WeekdayBox key={index} day={day} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    weekdayContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    weekdayBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedBox: {
        borderColor: 'green',
        backgroundColor: 'lightgreen', // ou outra cor para destacar o dia selecionado
    },
});

export default WeekdaySlider;
