import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Checkbox, Text, Button, TextInput } from 'react-native-paper';

const HabitFrequency = ({ navigation }) => {
    const [checked, setChecked] = useState('todos');
    const [selectedDays, setSelectedDays] = useState([]);
    const [repeatDays, setRepeatDays] = useState('');

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
        navigation.navigate('CreateHabit', { frequency: checked, days: selectedDays, repeat: repeatDays });
    };

    return (
        <View style={styles.container}>
            <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                <View style={styles.row}>
                    <RadioButton value="todos" />
                    <Text>Todos os dias</Text>
                </View>

                <View style={styles.row}>
                    <RadioButton value="alguns" />
                    <Text>Alguns dias da semana</Text>
                </View>

                {checked === 'alguns' && (
                    ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'].map(day => (
                        <View key={day} style={styles.row}>
                            <Checkbox status={selectedDays.includes(day) ? 'checked' : 'unchecked'} onPress={() => toggleDay(day)} />
                            <Text>{day}</Text>
                        </View>
                    ))
                )}

                <View style={styles.row}>
                    <RadioButton value="repetir" />
                    {checked === 'repetir' ? (
                        <>
                            <Text>A cada</Text>
                            <TextInput value={repeatDays} onChangeText={setRepeatDays} style={styles.input} keyboardType="numeric" />
                            <Text>dias</Text>
                        </>
                    ) : (
                        <Text>Repetir</Text>
                    )}
                </View>
            </RadioButton.Group>

            <Button mode="contained" onPress={saveFrequency}>Salvar</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
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
    }
});

export default HabitFrequency;
