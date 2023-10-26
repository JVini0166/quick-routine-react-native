import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateHabit = ({ navigation, route }) => {
    const [habitName, setHabitName] = useState(''); // <-- State for habit name
    const [description, setDescription] = useState(''); // <-- State for description
    const [inputStartDate, setInputStartDate] = useState(undefined);
    const [inputEndDate, setInputEndDate] = useState(undefined);
    const [error, setError] = useState(null);

    const { frequency = null, days = null, repeat = null } = route.params || {};

    const BACKEND_URL = "https://5000-jvini0166-quickroutinef-ha2qe54cevf.ws-us105.gitpod.io/quick-routine"

    const createHabit = async () => {
        if(!habitName) {
            setError('Please enter a habit name.');
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
            targetDate: inputEndDate
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
        padding: 16,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 8,
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
