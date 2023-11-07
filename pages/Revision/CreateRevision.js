import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DatePickerInput } from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';


const CreateRevision = ({ navigation, route }) => {
    const [revisionName, setRevisionName] = useState(''); // <-- State for revision name
    const [description, setDescription] = useState(''); // <-- State for description
    const [inputStartDate, setInputStartDate] = useState(undefined);
    const [error, setError] = useState(null);
    const [revisionTemplates, setRevisionTemplates] = useState([]);
    
    const fetchRevisionTemplates = async () => {
        const storedTemplates = await AsyncStorage.getItem('revisiontemplates');
        if (storedTemplates) {
            setRevisionTemplates(JSON.parse(storedTemplates));
        }
    };

    useFocusEffect(
        useCallback(() => {
            
            fetchRevisionTemplates();

            return () => {
                // Limpar efeitos ou listeners se necessário ao sair da tela.
            };
        }, [])
    );

    const dropdownData = revisionTemplates.map(template => ({
        label: template.title,
        value: template.title
    }));

    const generateRevisionDate = (startDate, unit, value) => {
        const date = new Date(startDate);
    
        switch (unit) {
            case 'dias':
                date.setDate(date.getDate() + parseInt(value));
                break;
            case 'meses':
                date.setMonth(date.getMonth() + parseInt(value));
                break;
            case 'anos':
                date.setFullYear(date.getFullYear() + parseInt(value));
                break;
        }
    
        return date;
    };

    const [selectedTemplate, setSelectedTemplate] = useState(null);
    
    
    const createRevision = async () => {
        if(!revisionName) {
            setError('Por favor, insira um nome para a revisão.');
            return;
        }
    
        let revisionDates = [];
        if (selectedTemplate && inputStartDate) {
            const template = revisionTemplates.find(t => t.title === selectedTemplate);
            if (template && template.timeEntries) {
                for (const entry of template.timeEntries) {
                    const revisionDate = generateRevisionDate(inputStartDate, entry.unit, entry.value);
                    revisionDates.push(revisionDate);
                }
            }
        }
    
        let existingRevisions = await AsyncStorage.getItem('revisions');
        if(!existingRevisions) {
            existingRevisions = [];
        } else {
            existingRevisions = JSON.parse(existingRevisions);
        }
    
        const newId = existingRevisions.length > 0 
            ? (parseInt(existingRevisions[existingRevisions.length - 1].id) + 1).toString()
            : "1";
    
        const newRevision = {
            id: newId,
            revision: revisionName,
            description: description,
            initDate: inputStartDate,
            revisionDates: revisionDates,
        };
    
        existingRevisions.push(newRevision);
        await AsyncStorage.setItem('revisions', JSON.stringify(existingRevisions));
    
        navigation.goBack();
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TextInput 
                    placeholder="Revisão"
                    style={styles.input}
                    value={revisionName}
                    onChangeText={text => setRevisionName(text)}
                />
                <TextInput 
                    placeholder="Descrição (opcional)"
                    style={styles.input}
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
                <DatePickerInput
                    locale="pt"
                    label="Data início"
                    value={inputStartDate}
                    onChange={(d) => setInputStartDate(d)}
                    inputMode="start"
                    style={styles.input}
                />

                <Text style={styles.label}>Template</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dropdownData}
                    placeholder="Selecione um template"
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    searchPlaceholder="Search..."
                    value={selectedTemplate}
                    onChange={item => {
                        setSelectedTemplate(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                />

                <Button 
                    mode="contained"
                    onPress={() => navigation.navigate('CreateRevisionTemplate')}
                >
                    Criar Template de Revisão
                </Button>

                {error && <Text style={{color: 'red', textAlign: 'center', marginVertical: 10}}>{error}</Text>}
                <Button 
                    style={styles.createButton}
                    mode="contained"
                    onPress={createRevision} 
                >
                    Criar Revisão
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
    createButton: {
        marginTop: 16,
        alignSelf: 'center',
    },
});

export default CreateRevision;
