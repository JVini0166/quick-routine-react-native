import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const RoutineConfig = ({ navigation }) => {
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [breakTime, setBreakTime] = useState('20');

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
                onPress={saveRoutineSettings}
                style={styles.button}>
                Salvar Configurações
            </Button>

            <Button 
                mode="contained" 
                onPress={() => navigation.navigate("RoutineIntervals")}
                style={styles.button}>
                Configurar Intervalos
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
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
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
});

export default RoutineConfig;
