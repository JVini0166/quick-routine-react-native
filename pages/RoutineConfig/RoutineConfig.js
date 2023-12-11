import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';

const RoutineConfig = ({ navigation }) => {
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [breakTime, setBreakTime] = useState('20');

    useEffect(() => {
        const loadSettings = async () => {
            const settingsString = await AsyncStorage.getItem('routinesettings');
            if (settingsString) {
                const settings = JSON.parse(settingsString);
                const { startTime, endTime, breakTime } = settings;
                const [startHr, startMin] = startTime.split(':');
                const [endHr, endMin] = endTime.split(':');

                setStartHour(startHr);
                setStartMinute(startMin);
                setEndHour(endHr);
                setEndMinute(endMin);
                setBreakTime(breakTime);
            }
        };

        loadSettings();
    }, []);

    const saveRoutineSettings = async () => {
        const settings = {
            startTime: `${startHour.padStart(2, '0')}:${startMinute.padStart(2, '0')}`,
            endTime: `${endHour.padStart(2, '0')}:${endMinute.padStart(2, '0')}`,
            breakTime,
        };
        await AsyncStorage.setItem('routinesettings', JSON.stringify(settings));
        alert('Configurações salvas!');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Horário de Início</Text>
            <View style={styles.timeInputContainer}>
                <TextInput
                    label="Hora"
                    value={startHour}
                    onChangeText={setStartHour}
                    style={styles.timeInput}
                    keyboardType="numeric"
                />
                <TextInput
                    label="Minuto"
                    value={startMinute}
                    onChangeText={setStartMinute}
                    style={styles.timeInput}
                    keyboardType="numeric"
                />
            </View>

            <Text style={styles.label}>Horário de Término</Text>
            <View style={styles.timeInputContainer}>
                <TextInput
                    label="Hora"
                    value={endHour}
                    onChangeText={setEndHour}
                    style={styles.timeInput}
                    keyboardType="numeric"
                />
                <TextInput
                    label="Minuto"
                    value={endMinute}
                    onChangeText={setEndMinute}
                    style={styles.timeInput}
                    keyboardType="numeric"
                />
            </View>
            
            {/* Outros campos e configurações */}
            
            <Button 
                mode="contained" 
                onPress={() => navigation.navigate("RoutineIntervals")}
                style={styles.button}>
                Configurar Intervalos
            </Button>

            <Button 
                mode="contained" 
                onPress={() => {
                   saveRoutineSettings();
                   navigation.navigate('Home');
                }
                }
                style={styles.button}>
                Salvar Configurações
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    timeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeInput: {
        flex: 1,
        marginHorizontal: 5,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 8,
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'gray',
        color: 'black',
    },
    whiteText: {
        color: 'white'
    }
});

export default RoutineConfig;
