import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';

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
        try {
            // Ler os dados existentes
            const routineDataString = await AsyncStorage.getItem('routine');
            let routineData = JSON.parse(routineDataString);
    
            // Atualizar a rotina
            Object.keys(routineData).forEach(day => {
                const routineIndex = routineData[day].findIndex(r => r.id === id);
                if (routineIndex > -1) {
                    routineData[day][routineIndex] = {
                        ...routineData[day][routineIndex],
                        name: itemName,
                        description: description,
                        // Adicione aqui outras propriedades que deseja atualizar
                    };
                }
            });
    
            // Salvar os dados atualizados
            await AsyncStorage.setItem('routine', JSON.stringify(routineData));
            navigation.goBack();
    
            // Navegar de volta ou mostrar alguma mensagem de sucesso
            // Por exemplo: navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar a rotina:', error);
            // Tratar erros, por exemplo, mostrar uma mensagem para o usuário
        }
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
        backgroundColor: colors.background,
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
        marginTop: 10,
        backgroundColor: 'gray',
        color: 'black',
    },
});

export default EditRoutineItem;
