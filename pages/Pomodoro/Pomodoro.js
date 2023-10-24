import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';

const Pomodoro = ({ navigation }) => {
    const durations = {
        Pomodoro: 25 * 60,
        'Pausa curta': 5 * 60,
        'Pausa longa': 15 * 60
    };

    const [time, setTime] = useState(durations.Pomodoro);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('Pomodoro');

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    }

    const resetTimer = () => {
        setIsActive(false);
        setTime(durations[mode]);
    }

    const selectMode = (selectedMode) => {
        setMode(selectedMode);
        setTime(durations[selectedMode]);
        setIsActive(false);
    }

    const displayTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const colors = {
        Pomodoro: { bg: '#FF4D4D', card: '#FF8080' },
        'Pausa curta': { bg: '#4DFF4D', card: '#80FF80' },
        'Pausa longa': { bg: '#4D4DFF', card: '#8080FF' }
    }

    return (
        <View style={{ ...styles.container, backgroundColor: colors[mode].bg }}>
            <Card style={{ ...styles.card, backgroundColor: colors[mode].card }}>
                <View style={styles.buttonContainer}>
                    {Object.keys(durations).map((key) => (
                        <Button key={key} onPress={() => selectMode(key)} mode="contained" style={styles.modeButton}>
                            {key}
                        </Button>
                    ))}
                </View>
                <Text style={styles.timerText}>{displayTime()}</Text>
                <Button onPress={toggleTimer}>
                    {isActive ? "Pause" : "Start"}
                </Button>
                <Button onPress={resetTimer}>Reset</Button>
            </Card>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => console.log('Add Task')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: '80%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        fontSize: 48,
        marginBottom: 10,
        textAlign: 'center',
        alignSelf: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    modeButton: {
        marginHorizontal: 5,
        height: 35,             // Ajuste na altura do botão
        width: 90,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 10  // Ajuste no padding horizontal para adequar o tamanho
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default Pomodoro;
