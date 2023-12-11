import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DatePickerInput } from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';

const EditRevision = ({ navigation, route }) => {
    const [revision, setRevision] = useState(null);
    const [revisionName, setRevisionName] = useState('');
    const [description, setDescription] = useState('');
    const [inputStartDate, setInputStartDate] = useState(new Date());
    const [error, setError] = useState(null);

    const loadRevisionData = async () => {
        const revisionId = route.params; // Use optional chaining
        if (!revisionId) {
            console.error('No revisionId provided');
            setError('No revision ID provided');
            return;
        }

        const storedRevisions = await AsyncStorage.getItem('revisions');
        if (storedRevisions) {
            const revisions = JSON.parse(storedRevisions);
            const rev = revisions.find(r => r.id === revisionId);
            if (rev) {
                setRevision(rev);
                setRevisionName(rev.revision);
                setDescription(rev.description);
                // Set inputStartDate if necessary
            } else {
                console.error('Revision not found');
                setError('Revision not found');
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadRevisionData();
        }, [])
    );

    const updateRevision = async () => {
        if (!revisionName) {
            setError('Por favor, insira um nome para a revisão.');
            return;
        }

        const storedRevisions = await AsyncStorage.getItem('revisions');
        let revisions = storedRevisions ? JSON.parse(storedRevisions) : [];

        for (let i = 0; i < revisions.length; i++) {
            if (revisions[i].id === revision.id) {
                revisions[i].revision = revisionName;
                revisions[i].description = description;
                // Handle other fields if necessary
                break;
            }
        }

        await AsyncStorage.setItem('revisions', JSON.stringify(revisions));
        navigation.goBack();
    };

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container}>
                <TextInput
                    label="Nome da Revisão"
                    value={revisionName}
                    onChangeText={setRevisionName}
                    style={styles.input}
                />
                <TextInput
                    label="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    multiline
                />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Button
                    mode="contained"
                    onPress={updateRevision}
                    style={styles.button}
                >
                    Atualizar Revisão
                </Button>
            </ScrollView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        paddingHorizontal: 8,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'gray',
        color: 'black',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default EditRevision;
