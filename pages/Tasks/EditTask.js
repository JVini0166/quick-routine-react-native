import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DatePickerModal } from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTask = ({ navigation, route }) => {
    
    const task  = route.params;
    
    const [taskTitle, setTaskTitle] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [estimatedTimeHour, setEstimatedTimeHour] = useState(task.hourAndMinute.split(':')[0]);
    const [estimatedTimeMinute, setEstimatedTimeMinute] = useState(task.hourAndMinute.split(':')[1]);
    const [taskDate, setTaskDate] = useState(new Date(task.date));
    const [isPendingTask, setIsPendingTask] = useState(task.keepPendent);
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const onDismissDatePicker = () => {
        setOpenDatePicker(false);
    };

    const onConfirmDatePicker = (params) => {
        setOpenDatePicker(false);
        setTaskDate(params.date);
    };

    const updateTask = async () => {
        let existingTasks = await AsyncStorage.getItem('tasks');
        existingTasks = existingTasks ? JSON.parse(existingTasks) : [];

        const updatedTasks = existingTasks.map(t => {
            if (t.id === task.id) {
                return {
                    ...t,
                    name: taskTitle,
                    description: description,
                    hourAndMinute: `${estimatedTimeHour.padStart(2, '0')}:${estimatedTimeMinute.padStart(2, '0')}`,
                    date: taskDate.toISOString().split('T')[0],
                    keepPendent: isPendingTask
                };
            }
            return t;
        });

        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
        navigation.goBack();
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput
                    label="Título"
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                    style={styles.input}
                />
                <TextInput
                    label="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    multiline
                />
                <View style={styles.timeContainer}>
                    <TextInput
                        label="Hora"
                        value={estimatedTimeHour}
                        onChangeText={setEstimatedTimeHour}
                        style={styles.timeInput}
                        keyboardType="number-pad"
                    />
                    <TextInput
                        label="Minuto"
                        value={estimatedTimeMinute}
                        onChangeText={setEstimatedTimeMinute}
                        style={styles.timeInput}
                        keyboardType="number-pad"
                    />
                </View>
                <Button
                    onPress={() => setOpenDatePicker(true)}
                    mode="outlined"
                >
                    Escolher Data da Tarefa
                </Button>
                <DatePickerModal
                    locale="pt"
                    mode="single"
                    visible={openDatePicker}
                    onDismiss={onDismissDatePicker}
                    date={taskDate}
                    onConfirm={onConfirmDatePicker}
                />
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={isPendingTask ? 'checked' : 'unchecked'}
                        onPress={() => setIsPendingTask(!isPendingTask)}
                    />
                    <Text style={styles.checkboxLabel}>Tarefa Pendente</Text>
                </View>
                {taskDate && (
                    <Text style={styles.dateText}>
                        Data da Tarefa: {taskDate.toLocaleDateString()}
                    </Text>
                )}
                <Button
                    style={styles.createButton}
                    mode="contained"
                    onPress={updateTask}
                >
                    Salvar Alterações
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
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    timeInput: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    dateText: {
        textAlign: 'center',
        marginBottom: 10,
    },
    createButton: {
        marginTop: 10,
    },
});

export default EditTask;
