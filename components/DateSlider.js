// DateSlider.js
import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DateSlider = ({ selectedDate, onDateSelect }) => {
    const generateDates = (current) => {
        const week = [];
        for (let i = -3; i <= 3; i++) {
            let date = new Date(current);
            date.setDate(date.getDate() + i);
            week.push(date);
        }
        return week;
    };

    const dates = generateDates(selectedDate);

    const DayBox = ({ date }) => {
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const dayOfWeek = date.toDateString().substring(0, 3); // Obtém a abreviação do dia da semana
        return (
            <TouchableOpacity style={[styles.dateBox, isSelected && styles.selectedDate]}
                              onPress={() => onDateSelect(date)}>
                <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
                <Text>{date.getDate()}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView
            horizontal={true}
            style={styles.dateContainer}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
        >
            {dates.map((date, index) => (
                <DayBox key={index} date={date} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateBox: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedDate: {
        borderColor: 'green',
        backgroundColor: 'lightgreen',
    },
    dayOfWeek: {
        fontWeight: 'bold',
    },
});

export default DateSlider;
