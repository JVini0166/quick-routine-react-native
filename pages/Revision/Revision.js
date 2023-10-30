import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import RevisionCard from '../../components/RevisionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


const Revision = ({ navigation }) => {
    const [revisions, setRevisions] = useState([]);

    useEffect(() => {
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

        fetchRevisions();
    }, []);

    return (
        <LinearGradient 
            style={styles.container}
            colors={['#02ad02', '#00FF00']} // DarkGreen to LimeGreen
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        <View style={styles.container}>
            <ScrollView style={styles.cardsContainer}>
                {revisions.map((revision) => (
                    <RevisionCard key={revision.id} revision={revision} />
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
        backgroundColor: '#fcac04'
    },
});

export default Revision;