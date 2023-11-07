import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';

const DateSlider = ({ selectedDate, onDateSelect }) => {
    // Adicionando uma referência ao ScrollView
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
        const dayOfWeek = date.toDateString().substring(0, 3);
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

    // Deslocamento para centralizar o dia selecionado
    const scrollToSelectedDate = (width) => {
        // Calcula o deslocamento baseado na largura do dispositivo e do DayBox
        const offset = (Dimensions.get('window').width / 2) - (width / 2);

        // A posição de rolagem é o índice do dia selecionado vezes a largura de um DayBox
        // Menos o deslocamento para centralizar e menos a largura de três DayBoxes para os dias anteriores.
        const position = (3 * width) - offset;

        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: position, animated: false });
        }
    };

    // Usando useEffect para rolar para o dia selecionado após a montagem do componente
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
                    // Isso só define a largura uma vez, pois todos os DayBox têm a mesma largura
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
