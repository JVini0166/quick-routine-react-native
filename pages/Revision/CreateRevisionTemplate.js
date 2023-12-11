import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../../components/colors';


const timeUnitsData = [
    { label: 'dias', value: 'dias' },
    { label: 'meses', value: 'meses' },
    { label: 'anos', value: 'anos' },
];

const CreateRevisionTemplate = ({navigation}) => {
    const [selectedTimeUnit, setSelectedTimeUnit] = useState(null);
    const [timeValue, setTimeValue] = useState('');
    const [timeEntries, setTimeEntries] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [error, setError] = useState(null);

    const saveTemplate = async () => {
        setError(null); // Reseta o erro toda vez que a função é chamada
    
        if (!templateName.trim() || timeEntries.length === 0) {
            setError("Por favor, preencha o nome do template e adicione ao menos uma entrada de tempo.");
            return;
        }
    
        try {
            const existingTemplatesString = await AsyncStorage.getItem("revisiontemplates");
            let existingTemplates = existingTemplatesString ? JSON.parse(existingTemplatesString) : [];
    
            // Verificar se um template com esse nome já existe
            if (existingTemplates.some(template => template.title.toLowerCase() === templateName.toLowerCase())) {
                setError("Já existe um template com esse nome.");
                return;
            }
    
            existingTemplates.push({
                title: templateName,
                timeEntries: timeEntries,
            });
    
            await AsyncStorage.setItem("revisiontemplates", JSON.stringify(existingTemplates));
            navigation.goBack();
        } catch (error) {
            setError("Houve um erro ao salvar o template.");
            console.error(error);
        }
    };
    
    
    const addTimeEntry = () => {

        setError(null);
        if (timeValue && selectedTimeUnit) {
            const exists = timeEntries.some(
                entry => entry.unit === selectedTimeUnit && entry.value === timeValue
            );
            if (exists) {
                setError("Tempo já foi adicionado.");
                return;  // Vamos retornar aqui para parar a execução do restante da função.
            }
    
            setTimeEntries(prevEntries => {
                const newEntries = [...prevEntries, { unit: selectedTimeUnit, value: timeValue }];
                return newEntries.sort((a, b) => {
                    if (a.unit === b.unit) {
                        return Number(a.value) - Number(b.value);
                    }
                    return timeUnitsData.findIndex(item => item.value === a.unit) - timeUnitsData.findIndex(item => item.value === b.unit);
                });
            });
        }
    };
    
    

    const removeTimeEntry = (index) => {
        const updatedEntries = [...timeEntries];
        updatedEntries.splice(index, 1);
        setTimeEntries(updatedEntries);
    };
    

    return (
        <View style={styles.container}>
            <Text>Nome do Template de Revisão:</Text>
                <TextInput 
                    style={styles.templateNameInput}
                    value={templateName}
                    onChangeText={setTemplateName}
                    placeholder="Digite o nome do template"
                />
            <View style={styles.row}>
                
                <Text style={styles.whiteText}>Após</Text>
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
                <Button onPress={addTimeEntry} style={styles.whiteText}>Adicionar tempo</Button>
            </View>

            {timeEntries.map((entry, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Text>{entry.value} {entry.unit}</Text>
                        <Button onPress={() => removeTimeEntry(index)}>Deletar</Button>
                    </Card.Content>
                </Card>
            ))}
            {error && <Text style={{color: 'red', textAlign: 'center', marginVertical: 10}}>{error}</Text>}
            <Button 
                mode="contained"
                style={styles.createButton}
                onPress={saveTemplate}
            >
                Criar Template de Revisão
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        justifyContent: 'space-between',
    },
    templateNameInput: {
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        borderRadius: 10,
    },
    input: {
        width: 50,
        height: 40,
        marginHorizontal: 8,
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        borderRadius: 10,
    },
    dropdown: {
        margin: 8,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        color: 'white',
        backgroundColor: 'white',
    },
    placeholderStyle: {
        color:'white'
    },
    selectedTextStyle: {
        color: 'white'
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
        backgroundColor: 'gray',
        color: 'black',
    },
    templateNameInput: {
        width: '100%',
        marginBottom: 16,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        paddingHorizontal: 10
    },
    whiteText: {
        color: 'white',
    }
});

export default CreateRevisionTemplate;
