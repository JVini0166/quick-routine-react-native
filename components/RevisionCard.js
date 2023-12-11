import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RevisionCard = ({ revision }) => {
    // Pega a data mais próxima no array revisionDates que ainda não passou
    const getNextRevisionDate = () => {
        const today = new Date();
        for (const date of revision.revisionDates) {
            const revisionDate = new Date(date);
    
            // Verificar se a data está no histórico e marcada com 1
            const isCompleted = revision.history.some(h => h.date === date && h.checked === 1);
            if (revisionDate > today && !isCompleted) {
                return revisionDate;
            }
        }
        return null; // Todas as revisões elegíveis já foram realizadas
    };

    const nextRevisionDate = getNextRevisionDate();

    return (
        <Card style={styles.card}>
            <View style={{ padding: 10 }}>
                <Text style={styles.revisionTitle}>{revision.revision}</Text>
                {nextRevisionDate ? (
                    <Text style={styles.nextRevisionDate}>Próxima revisão: {nextRevisionDate.toLocaleDateString()}</Text>
                ) : (
                    <Text style={styles.noRevisionLeft}>Todas as revisões foram realizadas.</Text>
                )}
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    revisionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    nextRevisionDate: {
        fontSize: 14,
        color: 'green',
    },
    noRevisionLeft: {
        fontSize: 14,
        color: 'gray',
    },
});

export default RevisionCard;
