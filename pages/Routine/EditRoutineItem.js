import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditRoutineItem = ({ navigation, route }) => {
    // Estados para armazenar os valores do formulário
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    // ... Outros estados conforme necessário

    const { id } = route.params; // Id da rotina a ser editada

    useEffect(() => {
        // Carregar os dados da rotina do AsyncStorage
        const loadRoutineData = async () => {
            const routineDataString = await AsyncStorage.getItem('routine');
            if (routineDataString) {
                const routineData = JSON.parse(routineDataString);
                // Encontrar a rotina pelo ID
                const days = Object.keys(routineData);
                for (let day of days) {
                    const routine = routineData[day].find(r => r.id === id);
                    if (routine) {
                        setItemName(routine.name);
                        setDescription(routine.description);
                        // Configurar os outros campos conforme necessário
                        break;
                    }
                }
            }
        };

        loadRoutineData();
    }, [id]);

    const handleUpdate = async () => {
        // Implemente a lógica para atualizar a rotina no AsyncStorage
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput 
                    label="Nome"
                    value={itemName}
                    onChangeText={setItemName}
                    style={styles.input}
                />
                <TextInput 
                    label="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                />
                {/* Adicione mais campos conforme necessário */}
                <Button 
                    mode="contained"
                    onPress={handleUpdate}
                    style={styles.button}
                >
                    Atualizar Rotina
                </Button>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});

export default EditRoutineItem;
