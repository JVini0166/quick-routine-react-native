import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Checkbox, Text, Button, TextInput } from 'react-native-paper';
import colors from '../../components/colors';

const RoutineItemFrequency = ({ navigation, route }) => {
    const { frequency, days } = route.params || {}; // Pegue os parâmetros da rota ou defina como um objeto vazio

    const [checked, setChecked] = useState(frequency || 'todos'); // Use o valor fornecido ou o valor padrão
    const [selectedDays, setSelectedDays] = useState(days || []);

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(prev => prev.filter(d => d !== day));
        } else {
            setSelectedDays(prev => [...prev, day]);
        }
    };

    const saveFrequency = () => {
        // Aqui você deve retornar os dados para a tela CreateHabit
        // por exemplo, usando navigation.navigate e passando os dados
        navigation.navigate('CreateRoutineItem', { frequency: checked, days: selectedDays });
    };

    return (
        <View style={styles.container}>
            <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                <View style={styles.row}>
                    <RadioButton value="todos" />
                    <Text style={styles.whiteText}>Todos os dias</Text>
                </View>

                <View style={styles.row}>
                    <RadioButton value="alguns" />
                    <Text style={styles.whiteText}>Alguns dias da semana</Text>
                </View>

                {checked === 'alguns' && (
                    ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'].map(day => (
                        <View key={day} style={styles.row}>
                            <Checkbox status={selectedDays.includes(day) ? 'checked' : 'unchecked'} onPress={() => toggleDay(day)} />
                            <Text style={styles.whiteText}>{day}</Text>
                        </View>
                    ))
                )}
            </RadioButton.Group>

            <Button mode="contained" onPress={saveFrequency} style={styles.whiteButton}>Salvar</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        width: 50,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    whiteText: {
        color: 'white'
    },
    whiteButton: {
        backgroundColor: 'gray',
        color: 'black',
    }
});

export default RoutineItemFrequency;
