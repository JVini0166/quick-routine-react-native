import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

const CreateHabit = ({ navigation, route }) => {
    const [inputStartDate, setInputStartDate] = useState(undefined);
    const [inputEndDate, setInputEndDate] = useState(undefined);
    const [error, setError] = React.useState(null);

    const { frequency = null, days = null, repeat = null } = route.params || {};

    const BACKEND_URL = "https://5000-jvini0166-quickroutinef-ha2qe54cevf.ws-us105.gitpod.io/quick-routine"

    const createHabit = async () => {

        console.log(frequency, days, repeat);
        // try {
        //     const response = await fetch(BACKEND_URL + '/create_habit', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             name: habitName, // assumindo que você tem um state ou variável chamado habitName
        //             description: habitDescription, // e assim por diante...
        //             frequency: habitFrequency,
        //             status: 'active', // exemplo; ajuste conforme sua necessidade
        //             start_date: inputStartDate,
        //             target_date: inputEndDate,
        //             user_id: userId // precisa fornecer o userId de algum lugar, talvez de um contexto ou prop
        //         }),
        //     });
    
        //     const data = await response.json();
            
        //     if (!response.ok) {
        //         setError(data.message);
        //         return;
        //     }
    
        //     // Tratar o sucesso como desejar, talvez navegando para outra tela, mostrando uma mensagem, etc.
    
        // } catch (error) {
        //     setError('Erro ao criar o hábito. Tente novamente.');
        // }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput 
                    placeholder="Hábito"
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Descrição (opcional)"
                    style={styles.input}
                />

                <Text style={styles.label}>Frequência</Text>
                <Button 
                    mode="contained"
                    onPress={() => navigation.navigate('HabitFrequency')} 
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
