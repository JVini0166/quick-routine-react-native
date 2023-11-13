import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

const TaskCard = ({ task, onPress }) => {
    // Formatar a data para o formato dd-MM-yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={styles.card}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.taskTitle}>{task.name}</Text>
                    <Text style={styles.taskDate}>Data: {formatDate(task.date)}</Text>
                    <Text style={styles.taskTime}>Hora: {task.hourAndMinute}</Text>
                </View>
            </Card>
        </TouchableOpacity>
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
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskDate: {
        fontSize: 14,
        color: 'blue',
    },
    taskTime: {
        fontSize: 14,
        color: 'green',
    },
});

export default TaskCard;
