import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DatePickerModal } from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';

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
        if (!taskTitle.trim()) {
            alert('Por favor, insira um título para a tarefa.');
            return;
        }

        if (!estimatedTimeHour.match(/^\d{1,2}$/) || estimatedTimeHour < 0 || estimatedTimeHour > 23) {
            alert('Por favor, insira uma hora válida (0-23).');
            return;
        }
    
        if (!estimatedTimeMinute.match(/^\d{1,2}$/) || estimatedTimeMinute < 0 || estimatedTimeMinute > 59) {
            alert('Por favor, insira um minuto válido (0-59).');
            return;
        }

        if (!taskDate) {
            alert('Por favor, escolha uma data para a tarefa.');
            return;
        }
    
        // Formatando hora e minuto
        const formattedTime = `${estimatedTimeHour.padStart(2, '0')}:${estimatedTimeMinute.padStart(2, '0')}`;
    
        // Formatando a data
        const formattedDate = taskDate ? taskDate.toISOString().split('T')[0] : '';

        let existingTasks = await AsyncStorage.getItem('tasks');
    existingTasks = existingTasks ? JSON.parse(existingTasks) : [];

    const newId = existingTasks.length > 0 
    ? (parseInt(existingTasks[existingTasks.length - 1].id) + 1).toString()
    : "1";
    
        // Criando objeto da tarefa
        const task = {
            id: newId, // Garantir que o ID seja uma string
            name: taskTitle,
            description: description,
            hourAndMinute: formattedTime,
            date: formattedDate,
            keepPendent: checked,
            state: 0,
            history: [],
        };
    
        // Salvando a tarefa no AsyncStorage
        try {
            existingTasks.push(task);
            await AsyncStorage.setItem('tasks', JSON.stringify(existingTasks));
            navigation.goBack();
        } catch (error) {
            // Tratar o erro, por exemplo, exibindo uma mensagem para o usuário
        }
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
                    mode="contained"
                    style={styles.whiteButton}
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
                        style={styles.checkboxLabel}
                    />
                    <Text style={styles.checkboxLabel}>Tarefa Pendente</Text>
                </View>
                {taskDate && (
                    <Text style={styles.dateText}>
                        Data da Tarefa: {taskDate.toLocaleDateString()}
                    </Text>
                )}

                <Button 
                    style={styles.whiteButton}
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
        padding: 10,
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
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        borderRadius: 10,
    },
    whiteButton: {
        marginTop: 16,
        backgroundColor: 'gray',
        color: 'black',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 8,
        color: 'white',
    },
    dateText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 8,
        color: 'white'
    },
});

export default CreateTask;
