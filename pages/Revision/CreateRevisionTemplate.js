import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

const timeUnitsData = [
    { label: 'dias', value: 'days' },
    { label: 'meses', value: 'months' },
    { label: 'anos', value: 'years' },
];

const CreateRevisionTemplate = () => {
    const [selectedTimeUnit, setSelectedTimeUnit] = useState(null);
    const [timeValue, setTimeValue] = useState('');
    const [timeEntries, setTimeEntries] = useState([]);

    const addTimeEntry = () => {
        if (timeValue && selectedTimeUnit) {
            setTimeEntries([...timeEntries, { unit: selectedTimeUnit, value: timeValue }]);
        }
    };

    const removeTimeEntry = (index) => {
        const updatedEntries = [...timeEntries];
        updatedEntries.splice(index, 1);
        setTimeEntries(updatedEntries);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text>Após</Text>
                <TextInput 
                    style={styles.input}
                    value={timeValue}
                    onChangeText={text => setTimeValue(text)}
                    keyboardType="numeric"
                />
                <Dropdown
                    style={styles.dropdown}
                    data={timeUnitsData}
                    placeholder="Selecionar"
                    valueField="value"
                    labelField="label"
                    value={selectedTimeUnit}
                    onChange={item => {
                        setSelectedTimeUnit(item.value);
                    }}
                />
                <Button onPress={addTimeEntry}>Adicionar tempo</Button>
            </View>

            {timeEntries.map((entry, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Text>{entry.value} {entry.unit}</Text>
                        <Button onPress={() => removeTimeEntry(index)}>-</Button>
                    </Card.Content>
                </Card>
            ))}

            <Button 
                mode="contained"
                style={styles.createButton}
            >
                Criar Template de Revisão
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    input: {
        width: 50,
        height: 40,
        marginHorizontal: 8,
    },
    dropdown: {
        margin: 8,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    card: {
        marginTop: 16,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    createButton: {
        marginTop: 24,
    },
});

export default CreateRevisionTemplate;
