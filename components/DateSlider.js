import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';


const DateSlider = ({ selectedDate, onDateSelect }) => {
    const scrollViewRef = useRef();
    const [dayBoxWidth, setDayBoxWidth] = useState(0);

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
        
        // Modifique esta linha para obter o dia da semana em português
        const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' });

        return (
            <TouchableOpacity
                style={[styles.dateBox, isSelected && styles.selectedDate]}
                onPress={() => onDateSelect(date)}
            >
                <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
                <Text>{date.getDate()}</Text>
            </TouchableOpacity>
        );
    };

    const scrollToSelectedDate = (width) => {
        const offset = (Dimensions.get('window').width / 2) - (width / 2);
        const position = (3 * width) - offset;

        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: position, animated: false });
        }
    };

    useEffect(() => {
        if (dayBoxWidth) {
            scrollToSelectedDate(dayBoxWidth);
        }
    }, [selectedDate, dayBoxWidth]);

    return (
        <ScrollView
            horizontal={true}
            ref={scrollViewRef}
            style={styles.dateContainer}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
        >
            {dates.map((date, index) => (
                <View key={index} onLayout={event => {
                    if (dayBoxWidth === 0) {
                        const { width } = event.nativeEvent.layout;
                        setDayBoxWidth(width);
                        scrollToSelectedDate(width);
                    }
                }}>
                    <DayBox date={date} />
                </View>
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
