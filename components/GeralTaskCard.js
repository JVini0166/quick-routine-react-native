import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GeralTaskCard = ({ task }) => {
    const [buttonState, setButtonState] = useState(task.state); // Inicialize com o estado da tarefa
    const [localTask, setLocalTask] = useState(task); // Estado local para armazenar a tarefa


    const loadTask = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            let tasks = storedTasks ? JSON.parse(storedTasks) : [];
            let foundTask = tasks.find(t => t.id === task.id);
            if (foundTask) {
                setLocalTask(foundTask);
            }
        } catch (error) {
            console.error('Erro ao carregar a tarefa do AsyncStorage', error);
        }
    };

    useEffect(() => {
        loadTask();
    }, [buttonState]);


    const updateTaskInAsyncStorage = async (newState) => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            let tasks = storedTasks ? JSON.parse(storedTasks) : [];

            tasks = tasks.map(t => {
                if (t.id === task.id) {
                    const updatedTask = { ...t, state: newState };
                    setLocalTask(updatedTask); // Atualiza o estado local da tarefa
                    return updatedTask;
                }
                return t;
            });

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Erro ao atualizar a tarefa no AsyncStorage', error);
        }
    };

    const handleButtonPress = () => {
        const newState = (buttonState + 1) % 3;
        setButtonState(newState);
        updateTaskInAsyncStorage(newState);
    };

    const getButtonContent = () => {
        switch (buttonState) { // Alterado para usar buttonState
            case 0:
                return { icon: 'question', color: '#f2cb15' };
            case 1:
                return { icon: 'check', color: 'green' };
            case 2:
                return { icon: 'close', color: 'red' };
            default:
                return { icon: 'question', color: '#f2cb15' };
        }
    };

    const { icon, color } = getButtonContent();

    return (
        <Card style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.leftContainer}>
                    <Text style={styles.taskTitle}>{localTask.name}</Text>
                    <View style={styles.taskLabelContainer}>
                        <Text style={styles.taskLabelText}>Tarefa</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.rightButton, { backgroundColor: color }]} onPress={handleButtonPress}>
                    <Icon name={icon} size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1, // Isso garante que o cardContent tome todo o espaço disponível do Card
    },
    leftContainer: {
        flexShrink: 1, // Isso permite que o leftContainer encolha se necessário
        marginRight: 'auto', // Isso empurra tudo após o leftContainer para a direita
        flex: 1
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
    },
    taskLabelContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
    },
    taskLabelText: {
        fontSize: 14,
    },
    rightButton: {
        padding: 10,
        borderRadius: 5,
        marginLeft: 200, // Adiciona um espaçamento entre o botão e o conteúdo da esquerda
    },
});

export default GeralTaskCard;
