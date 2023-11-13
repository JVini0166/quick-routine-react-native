import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DatePickerModal } from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateTask = ({ navigation }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTimeHour, setEstimatedTimeHour] = useState('');
    const [estimatedTimeMinute, setEstimatedTimeMinute] = useState('');
    const [taskDate, setTaskDate] = useState(undefined);
    const [isPendingTask, setIsPendingTask] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [checked, setChecked] = useState(false); // Para o Checkbox


    const onDismissDatePicker = () => {
        setOpenDatePicker(false);
    };

    const onConfirmDatePicker = (params) => {
        setOpenDatePicker(false);
        setTaskDate(params.date);
    };

    const createTask = async () => {
        // Lógica para criar a tarefa
        // Salvar no AsyncStorage, etc.
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput 
                    placeholder="Título"
                    style={styles.input}
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                />
                <TextInput 
                    placeholder="Descrição (opcional)"
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={styles.timeContainer}>
                    <TextInput 
                        placeholder="Hora"
                        style={styles.timeInput}
                        keyboardType="number-pad"
                        value={estimatedTimeHour}
                        onChangeText={setEstimatedTimeHour}
                    />
                    <TextInput 
                        placeholder="Minuto"
                        style={styles.timeInput}
                        keyboardType="number-pad"
                        value={estimatedTimeMinute}
                        onChangeText={setEstimatedTimeMinute}
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
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
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
                    onPress={createTask}
                >
                    Criar Tarefa
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
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeInput: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 8,
        flex: 1,
    },
    createButton: {
        marginTop: 16,
        alignSelf: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 8,
    },
    dateText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 8,
    },
});

export default CreateTask;
