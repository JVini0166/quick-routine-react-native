import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';

const RoutineIntervals = ({navigation}) => {
    const [intervalName, setIntervalName] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [intervals, setIntervals] = useState([]);

    const handleCreateInterval = () => {
        if (intervalName && hour && minute) {
            const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
            setIntervals([...intervals, { name: intervalName, time: formattedTime }]);
            setIntervalName('');
            setHour('');
            setMinute('');
        }
    };

    const handleDeleteInterval = (index) => {
        const updatedIntervals = intervals.filter((_, i) => i !== index);
        setIntervals(updatedIntervals);
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                label="Nome do Intervalo"
                value={intervalName}
                onChangeText={setIntervalName}
                style={styles.input}
            />

            <View style={styles.timeInputContainer}>
                <TextInput
                    label="Hora"
                    value={hour}
                    onChangeText={setHour}
                    style={styles.timeInput}
                    keyboardType="numeric"
                />
                <TextInput
                    label="Minuto"
                    value={minute}
                    onChangeText={setMinute}
                    style={styles.timeInput}
                    keyboardType="numeric"
                />
            </View>

            <Button mode="contained" onPress={handleCreateInterval} style={styles.button}>
                Criar Intervalo
            </Button>

            {intervals.map((interval, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content>
                        <Text style={styles.intervalTitle}>{interval.name}</Text>
                        <Text>{interval.time}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => handleDeleteInterval(index)}>Excluir</Button>
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        marginBottom: 10, // Adiciona espaçamento entre o botão e os cards
    },
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 20,
    },
    timeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeInput: {
        flex: 1,
        marginHorizontal: 5,
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
    intervalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default RoutineIntervals;
