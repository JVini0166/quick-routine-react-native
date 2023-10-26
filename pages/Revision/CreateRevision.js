import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateRevision = ({ navigation, route }) => {
    const [revisionName, setRevisionName] = useState(''); // <-- State for revision name
    const [description, setDescription] = useState(''); // <-- State for description
    const [error, setError] = useState(null);

    const createRevision = async () => {
        if(!revisionName) {
            setError('Por favor, insira um nome para a revisão.');
            return;
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
        };

        existingRevisions.push(newRevision);
        await AsyncStorage.setItem('revisions', JSON.stringify(existingRevisions));

        navigation.goBack(); // or other logic
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

                <Text style={styles.label}>Template</Text>
                <Button 
                    mode="contained"
                    onPress={() => navigation.navigate('CreateRevisionTemplate')}
                >
                    Selecionar
                </Button>

                {error && <Text style={{color: 'red', textAlign: 'center', marginVertical: 10}}>{error}</Text>}
                <Button 
                    style={styles.createButton}
                    mode="contained"
                    onPress={createRevision} 
                >
                    Criar Template
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
