
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Card, FAB, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../components/colors';
import TaskCard from '../../components/TaskCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tasks = ({navigation}) => {

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [tasks, setTasks] = useState([]);

    const deleteTask = async (id) => {
        let existingTasks = await AsyncStorage.getItem('tasks');
        existingTasks = existingTasks ? JSON.parse(existingTasks) : [];
        
        const updatedTasks = existingTasks.filter(t => t.id !== id);
        
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        fetchTasks(); // Função para recarregar as tarefas após a exclusão
        setConfirmDeleteVisible(false);
        setSelectedTask(null);
    };

    const renderDeleteConfirmModal = () => {
        if (confirmDeleteVisible && selectedTask) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text>Deseja mesmo excluir a tarefa?</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Button onPress={() => setConfirmDeleteVisible(false)}>
                                Não
                            </Button>
                            <Button 
                                onPress={() => {
                                    deleteTask(selectedTask.id);
                                    setConfirmDeleteVisible(false);
                                }} 
                                style={{ marginLeft: 10 }}>
                                Sim
                            </Button>
                        </View>
                    </View>
                </View>
            );
        }
        return null;
    };

    const renderBottomSheet = () => {
        if (bottomSheetVisible && selectedTask) {
            return (
                <View style={styles.overlay}>
                    <TouchableOpacity 
                        style={styles.fullScreenTouchable} 
                        onPress={() => setBottomSheetVisible(false)}
                        activeOpacity={1}>
                        <View 
                            style={styles.bottomSheet}
                            onStartShouldSetResponder={() => true}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EditTask', selectedTask);
                                setBottomSheetVisible(false);
                            }}>
                                <Text>Editar Tarefa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => setConfirmDeleteVisible(true)} 
                                style={{ marginTop: 10 }}>
                                <Text style={{ color: 'red' }}>Excluir Tarefa</Text>
                            </TouchableOpacity>
                            {/* Outras opções do BottomSheet */}
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };
    
    const fetchTasks = async () => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
            const tasksArray = JSON.parse(storedTasks);
            tasksArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            setTasks(tasksArray);
        }
    };

    useFocusEffect(
        useCallback(() => {
            
            fetchTasks();

            return () => {
                // Limpar efeitos ou listeners se necessário ao sair da tela.
            };
        }, [])
    );

    return (
        <LinearGradient 
            style={styles.container}
            colors={[colors.primary, colors.secondary]} // DarkGreen to LimeGreen
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        <View style={styles.container}>
            <ScrollView style={styles.cardsContainer}>
                {tasks.map(task => (
                    <TaskCard 
                        key={task.id}
                        task={task}
                        onPress={() => {
                            setSelectedTask(task);
                            setBottomSheetVisible(true);
                        }}
                    />
                ))}
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateTask', { name: 'CreateTask' })}
            />
            {renderBottomSheet()}
            {renderDeleteConfirmModal()}
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    cardsContainer: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0, 
        backgroundColor: colors.fab
    },
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
    }
});

export default Tasks;