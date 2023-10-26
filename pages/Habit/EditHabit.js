import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditHabit = ({ navigation, route }) => {
    const habitData = route.params;

    const [habitName, setHabitName] = useState(habitData.habit);
    const [description, setDescription] = useState(habitData.description);
    const [inputStartDate, setInputStartDate] = useState(new Date(habitData.initDate));
    const [inputEndDate, setInputEndDate] = useState(new Date(habitData.targetDate));
    const [error, setError] = useState(null);


    const { id, frequency = null, days = null, repeat = null } = route.params || {};

    const deleteHabit = async () => {
        let existingHabits = await AsyncStorage.getItem('habits');
        existingHabits = existingHabits ? JSON.parse(existingHabits) : [];
    
        const updatedHabits = existingHabits.filter(h => h.id !== id);
    
        await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
        navigation.goBack();
    };
    

    const updateHabit = async () => {
        if (!habitName) {
            setError('Please enter a habit name.');
            return;
        }

        let existingHabits = await AsyncStorage.getItem('habits');
        existingHabits = existingHabits ? JSON.parse(existingHabits) : [];

        const updatedHabit = {
            id: id,
            habit: habitName,
            description: description,
            frequency: frequency,
            initDate: inputStartDate,
            targetDate: inputEndDate
        };

        // Encontrar o índice do hábito a ser atualizado e substituí-lo
        const habitIndex = existingHabits.findIndex(h => h.id === id);
        existingHabits[habitIndex] = updatedHabit;

        await AsyncStorage.setItem('habits', JSON.stringify(existingHabits));
        navigation.goBack();
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
                <View style={styles.buttonContainer}>
                    <Button 
                        style={styles.updateButton}
                        mode="contained"
                        onPress={updateHabit} 
                    >
                        Atualizar
                    </Button>
                    <Button 
                        style={styles.deleteButton}
                        mode="contained"
                        color="red"
                        onPress={deleteHabit} 
                    >
                        Excluir
                    </Button>
                </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    updateButton: {
        flex: 1,
        marginRight: 8, // para dar um pequeno espaço entre os botões
    },
    deleteButton: {
        flex: 1,
        marginLeft: 8, // para dar um pequeno espaço entre os botões
    },
});
export default EditHabit;
