import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const RoutineCard = ({ item }) => {
    return (
        <Card style={styles.routineCard}>
            <Card.Content>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>Inicio: {item.initHour}</Text>
                <Text>Fim: {item.endHour}</Text>
                <Text>Frequência: {item.frequency.join(', ')}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    routineCard: {
        width: '100%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RoutineCard;
