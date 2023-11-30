import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Envs from '../../components/Envs';
import colors from '../../components/colors';


const CreateHabit = ({ navigation, route }) => {
    const [habitName, setHabitName] = useState(''); // <-- State for habit name
    const [description, setDescription] = useState(''); // <-- State for description
    const [inputStartDate, setInputStartDate] = useState(undefined);
    const [inputEndDate, setInputEndDate] = useState(undefined);
    const [error, setError] = useState(null);

    const { frequency = null, days = null, repeat = null } = route.params || {};

    const BACKEND_URL = Envs.BACKEND_URL;

    const createHabit = async () => {
         
        setError(null); // Reseta o erro toda vez que a função é chamada

        // Validação do nome do hábito
        if (!habitName) {
            setError('Por favor, insira um nome para o hábito.');
            return;
        }

        // Validação da descrição
        if (!description) {
            setError('Por favor, insira uma descrição.');
            return;
        }

        // Validação da frequência
        if (!frequency) {
            setError('Por favor, selecione uma frequência.');
            return;
        }

        // Validação da data inicial
        if (!inputStartDate) {
            setError('Por favor, selecione uma data de início.');
            return;
        }

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Reseta a parte de hora, para comparar somente as datas

        const dataInicio = new Date(inputStartDate); // Supondo que inputStartDate esteja em um formato válido de data
        if (dataInicio < hoje) {
            setError('A data de início não pode ser anterior ao dia atual.');
            return;
        }

        // Validação da data alvo
        if (!inputEndDate) {
            setError('Por favor, selecione uma data alvo.');
            return;
        }

        const dataAlvo = new Date(inputEndDate); // Supondo que inputEndDate esteja em um formato válido de data
        if (dataAlvo < dataInicio) {
            setError('A data alvo não pode ser anterior à data de início.');
            return;
        }
    
        let existingHabits = await AsyncStorage.getItem('habits');
        if(!existingHabits) {
            existingHabits = [];
        } else {
            existingHabits = JSON.parse(existingHabits);
        }
    
        // If there are habits, get the last habit's ID and increment it, else start with 1.

        const newId = existingHabits.length > 0 
            ? (parseInt(existingHabits[existingHabits.length - 1].id) + 1).toString()
            : "1";
    
        const newHabit = {
            id: newId,
            habit: habitName,
            description: description,
            frequency: frequency,
            initDate: inputStartDate,
            targetDate: inputEndDate,
            history: []
        };
    
        existingHabits.push(newHabit);
        await AsyncStorage.setItem('habits', JSON.stringify(existingHabits));
    
        // You can navigate or show a success message here
        navigation.goBack(); // or other logic
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput 
                    placeholder="Hábito"
                    style={styles.input}
                    value={habitName}
                    onChangeText={text => setHabitName(text)}
                />
                <TextInput 
                    placeholder="Descrição (opcional)"
                    style={styles.input}
                    value={description} // <-- Bind the state to value
                    onChangeText={text => setDescription(text)} // <-- Update state on change
                />

                <Text style={styles.label}>Frequência</Text>
                <Button 
                    mode="contained"
                    onPress={() => navigation.navigate('HabitFrequency', { 
                        frequency: frequency,
                        days: days,
                        repeat: repeat 
                    })}
                >
                    Selecionar
                </Button>

                <DatePickerInput
                    locale="pt"
                    label="Data início"
                    value={inputStartDate}
                    onChange={(d) => setInputStartDate(d)}
                    inputMode="start"
                    style={styles.input}
                />

                <DatePickerInput
                    locale="pt"
                    label="Data alvo"
                    value={inputEndDate}
                    onChange={(d) => setInputEndDate(d)}
                    inputMode="end"
                    style={styles.input}
                />
                {error && <Text style={{color: 'red', textAlign: 'center', marginVertical: 10}}>{error}</Text>}
                <Button 
                    style={styles.createButton}
                    mode="contained"
                    onPress={createHabit} 
                >
                    Criar
                </Button>
                
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
    },
    card: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 8,
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
    createButton: {
        marginTop: 16,
        alignSelf: 'center',
    },
});

export default CreateHabit;
