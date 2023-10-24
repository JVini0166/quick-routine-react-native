import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Switch, Divider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PomodoroSettings = () => {
    const [pomodoroTime, setPomodoroTime] = useState('');
    const [shortBreakTime, setShortBreakTime] = useState('');
    const [longBreakTime, setLongBreakTime] = useState('');
    const [autoStartBreaks, setAutoStartBreaks] = useState(false);
    const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState('');

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const storedSettings = await AsyncStorage.getItem('PomodoroSettings');
            if(storedSettings !== null) {
                const { 
                    pomodoroTime, 
                    shortBreakTime, 
                    longBreakTime, 
                    autoStartBreaks, 
                    autoStartPomodoros, 
                    pomodoroCount 
                } = JSON.parse(storedSettings);

                setPomodoroTime(pomodoroTime);
                setShortBreakTime(shortBreakTime);
                setLongBreakTime(longBreakTime);
                setAutoStartBreaks(autoStartBreaks);
                setAutoStartPomodoros(autoStartPomodoros);
                setPomodoroCount(pomodoroCount);
            }
        } catch (error) {
            console.log('Erro' + error.toString());
        }
    }

    const saveSettings = async () => {
        try {
            const settings = {
                pomodoroTime,
                shortBreakTime,
                longBreakTime,
                autoStartBreaks,
                autoStartPomodoros,
                pomodoroCount
            };
            await AsyncStorage.setItem('PomodoroSettings', JSON.stringify(settings));
            alert('Sucesso', 'Configurações salvas com sucesso!');
        } catch (error) {
            alert('Erro' + error.toString());
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Time (minutes)</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    label="Pomodoro"
                    value={pomodoroTime}
                    onChangeText={setPomodoroTime}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    label="Pausa Curta"
                    value={shortBreakTime}
                    onChangeText={setShortBreakTime}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    label="Pausa Longa"
                    value={longBreakTime}
                    onChangeText={setLongBreakTime}
                    style={styles.input}
                    keyboardType="numeric"
                />
            </View>

            <Divider style={styles.divider} />

            <View style={styles.switchContainer}>
                <Text>Começar pausas auto</Text>
                <Switch value={autoStartBreaks} onValueChange={setAutoStartBreaks} />
            </View>
            <View style={styles.switchContainer}>
                <Text>Começar pomodoros auto</Text>
                <Switch value={autoStartPomodoros} onValueChange={setAutoStartPomodoros} />
            </View>

            <View style={styles.textWithInput}>
                <Text>Qntd Pomodoros Pausa Longa:</Text>
                <TextInput
                    value={pomodoroCount}
                    onChangeText={setPomodoroCount}
                    style={styles.shortInput}
                    keyboardType="numeric"
                />
            </View>
            <Button mode="contained" onPress={saveSettings}>Salvar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
    divider: {
        marginVertical: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    textWithInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    shortInput: {
        width: 50,
        marginLeft: 10,
    },
});

export default PomodoroSettings;
