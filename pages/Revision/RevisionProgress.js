import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors'; // Ajuste o caminho se necessário.
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Certifique-se de instalar essa biblioteca.

const RevisionProgress = ({ navigation, route }) => {
    const revisionId  = route.params;
    const [revision, setRevision] = useState(null);

    const [revisionStatuses, setRevisionStatuses] = useState({});

    const handleStatusChange = (date, status) => {
        setRevisionStatuses(prevStatuses => ({
            ...prevStatuses,
            [date]: status
        }));
    };

    
    useEffect(() => {
        const fetchRevision = async () => {
            try {
                const storedRevisions = await AsyncStorage.getItem('revisions');
                if (storedRevisions) {
                    const revisions = JSON.parse(storedRevisions);
                    const rev = revisions.find(r => r.id === revisionId);
                    setRevision(rev);
                }
            } catch (error) {
                console.error('Failed to fetch revision:', error);
            }
        };

        fetchRevision();
    }, [revisionId]);

    if (!revision) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title={revision.revision} />
                <Card.Content>
                    <Text>{revision.description}</Text>
                    {/* Outras informações da revisão podem ser adicionadas aqui */}
                </Card.Content>
            </Card>

            {revision.revisionDates.map((date, index) => (
                <Card 
                    key={index} 
                    style={[
                        styles.card, 
                        { backgroundColor: revisionStatuses[date] === 'certo' ? 'green' : revisionStatuses[date] === 'errado' ? 'red' : 'white' }
                    ]}
                >
                    <View style={styles.revisionDateContainer}>
                        <Text>{new Date(date).toLocaleDateString()}</Text>
                        <View style={styles.iconsContainer}>
                            <TouchableOpacity onPress={() => handleStatusChange(date, 'certo')}>
                                <Icon name="check-circle" size={24} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStatusChange(date, 'errado')}>
                                <Icon name="close-circle" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
    },
    card: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    revisionDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 70, // Ajuste a largura conforme necessário
    },
    // Inclua outros estilos que você precisa aqui
});

export default RevisionProgress;
