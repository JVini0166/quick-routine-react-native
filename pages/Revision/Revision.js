import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import RevisionCard from '../../components/RevisionCard';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../components/colors';  // Ajuste o caminho se necessário.


const Revision = ({ navigation }) => {
    const [revisions, setRevisions] = useState([]);


    const fetchRevisions = async () => {
        try {
            const storedRevisions = await AsyncStorage.getItem('revisions');
            if (storedRevisions) {
                setRevisions(JSON.parse(storedRevisions));
            }
        } catch (error) {
            console.error('Failed to fetch revisions:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            
            fetchRevisions();

            return () => {
                // Limpar efeitos ou listeners se necessário ao sair da tela.
            };
        }, [])
    );


    return (
        <LinearGradient 
            style={styles.container}
            colors={[colors.primary, colors.secondary]} // DarkGreen to LimeGreen
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        <View style={styles.container}>
            <ScrollView style={styles.cardsContainer}>
                    {revisions.map((revision) => (
                        // Agora envolvendo o RevisionCard com TouchableOpacity
                        <TouchableOpacity
                            key={revision.id}
                            onPress={() => navigation.navigate('RevisionProgress', { revisionId: revision.id })}
                        >
                            <RevisionCard revision={revision} navigation={navigation} />
                        </TouchableOpacity>
                    ))}
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateRevision', { name: 'CreateRevision' })}
            />
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    cardsContainer: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0, 
        backgroundColor: colors.fab
    },
});

export default Revision;