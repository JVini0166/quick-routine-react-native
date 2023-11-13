import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const GeralTaskCard = ({ task }) => {
    const [buttonState, setButtonState] = useState(0);

    const handleButtonPress = () => {
        setButtonState((prevButtonState) => (prevButtonState + 1) % 3);
    };

    const getButtonContent = () => {
        switch (buttonState) {
            case 0:
                return { icon: 'question', color: 'yellow' };
            case 1:
                return { icon: 'check', color: 'green' };
            case 2:
                return { icon: 'close', color: 'red' };
            default:
                return { icon: 'question', color: 'yellow' };
        }
    };

    const { icon, color } = getButtonContent();

    return (
        <Card style={styles.card}>
        <View style={styles.cardContent}>
            <View style={styles.leftContainer}>
                <Text style={styles.taskTitle}>{task.name}</Text>
                <View style={styles.taskLabelContainer}> {/* Correção aqui */}
                    <Text style={styles.taskLabelText}>Tarefa</Text>
                </View>
            </View>
            <TouchableOpacity style={[styles.rightButton, { backgroundColor: color }]} onPress={handleButtonPress}>
                <Icon name={icon} size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1, // Isso garante que o cardContent tome todo o espaço disponível do Card
    },
    leftContainer: {
        flexShrink: 1, // Isso permite que o leftContainer encolha se necessário
        marginRight: 'auto', // Isso empurra tudo após o leftContainer para a direita
        flex: 1
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
    },
    taskLabelContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
    },
    taskLabelText: {
        fontSize: 14,
    },
    rightButton: {
        padding: 10,
        borderRadius: 5,
        marginRight: 0,
    },
});

export default GeralTaskCard;
