import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Checkbox, Text, Button, TextInput } from 'react-native-paper';
import colors from '../../components/colors';

const HabitFrequency = ({ navigation, route }) => {
    const { frequency, days, repeat } = route.params || {}; // Pegue os parâmetros da rota ou defina como um objeto vazio

    const [checked, setChecked] = useState(frequency || 'todos'); // Use o valor fornecido ou o valor padrão
    const [selectedDays, setSelectedDays] = useState(days || []);
    const [repeatDays, setRepeatDays] = useState(repeat || '');

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

                <View style={styles.row}>
                    <RadioButton value="repetir" />
                    {checked === 'repetir' ? (
                        <>
                            <Text style={styles.whiteText}>A cada</Text>
                            <TextInput value={repeatDays} onChangeText={setRepeatDays} style={styles.input} keyboardType="numeric" />
                            <Text style={styles.whiteText}>dias</Text>
                        </>
                    ) : (
                        <Text style={styles.whiteText}>Repetir</Text>
                    )}
                </View>
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
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 8,
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        borderRadius: 10,
    },
    whiteButton: {
        backgroundColor: 'gray',
        color: 'black',
    },
    whiteText: {
        color: 'white',
    }
});

export default HabitFrequency;
