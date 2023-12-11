import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';

const CreateRoutineItem = ({ navigation, route }) => {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');

    const { frequency = null, days = null, repeat = null } = route.params || {};

    const handleCreate = async () => {
        if (!itemName || !startHour || !endHour) {
            // Adicione uma lógica para lidar com a validação
            console.error("Dados incompletos.");
            return;
        }
    
        let frequencyArray = [];
        if (frequency === 'todos') {
            frequencyArray = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
        } else if (frequency === 'alguns' && days) {
            frequencyArray = days.map(day => {
                switch (day) {
                    case 'segunda': return 'seg';
                    case 'terça': return 'ter';
                    case 'quarta': return 'qua';
                    case 'quinta': return 'qui';
                    case 'sexta': return 'sex';
                    case 'sábado': return 'sab';
                    case 'domingo': return 'dom';
                    default: return '';
                }
            }).filter(day => day); // Filtra dias vazios
        }

        const routineDataString = await AsyncStorage.getItem('routine');
        let routineData = routineDataString ? JSON.parse(routineDataString) : {
            seg: [], ter: [], qua: [], qui: [], sex: [], sab: [], dom: []
        };

        let maxId = 0;
        Object.keys(routineData).forEach(day => {
            routineData[day].forEach(item => {
                const itemId = parseInt(item.id, 10);
                if (itemId > maxId) {
                    maxId = itemId;
                }
            });
        });
        const newId = maxId + 1;
    
        const newRoutineItem = {
            id: newId.toString(),
            name: itemName,
            description: description,
            initHour: `${startHour}:${startMinute || '00'}`,
            endHour: `${endHour}:${endMinute || '00'}`,
            frequency: frequencyArray,
            history: [],
        };
        
        frequencyArray.forEach(day => {
            if (routineData[day]) {
                routineData[day].push(newRoutineItem);
            }
        });

        try {
            await AsyncStorage.setItem('routine', JSON.stringify(routineData));
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar o item da rotina:", error);
        }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput 
                    placeholder="Nome"
                    style={styles.input}
                    value={itemName}
                    onChangeText={setItemName}
                />
                <TextInput 
                    placeholder="Descrição (opcional)"
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />

                <Button 
                    mode="contained"
                    onPress={() => navigation.navigate('RoutineItemFrequency')}
                    style={styles.createButton}
                >
                    Frequência
                </Button>

                <Text style={styles.label}>Horário Início</Text>
                <View style={styles.timeInputContainer}>
                    <TextInput
                        placeholder="Hora"
                        style={styles.timeInput}
                        value={startHour}
                        onChangeText={setStartHour}
                    />
                    <TextInput
                        placeholder="Minuto"
                        style={styles.timeInput}
                        value={startMinute}
                        onChangeText={setStartMinute}
                    />
                </View>

                <Text style={styles.label}>Horário Fim</Text>
                <View style={styles.timeInputContainer}>
                    <TextInput
                        placeholder="Hora"
                        style={styles.timeInput}
                        value={endHour}
                        onChangeText={setEndHour}
                    />
                    <TextInput
                        placeholder="Minuto"
                        style={styles.timeInput}
                        value={endMinute}
                        onChangeText={setEndMinute}
                    />
                </View>

                <Button 
                    style={styles.createButton}
                    mode="contained"
                    onPress={handleCreate}
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        color: 'white'
    },
    timeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    timeInput: {
        flex: 1,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        borderRadius: 10,
    },
    createButton: {
        marginTop: '10px',
        backgroundColor: 'gray',
        color: 'black',
    },
});

export default CreateRoutineItem;
