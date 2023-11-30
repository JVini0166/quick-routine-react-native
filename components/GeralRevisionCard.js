import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const GeralRevisionCard = ({ revision }) => {
    const [buttonState, setButtonState] = useState(0);

    const handleButtonPress = () => {
        setButtonState((prevButtonState) => (prevButtonState + 1) % 3);
    };

    const getButtonContent = () => {
        switch (buttonState) {
            case 0:
                return { icon: 'question', color: '#f2cb15' };
            case 1:
                return { icon: 'check', color: 'green' };
            case 2:
                return { icon: 'close', color: 'red' };
            default:
                return { icon: 'question', color: '#f2cb15' };
        }
    };

    const { icon, color } = getButtonContent();

    return (
        <Card style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.leftContainer}>
                    <Text style={styles.revisionTitle}>{revision.revision}</Text>
                    <View style={styles.revisionLabelContainer}>
                        <Text style={styles.revisionLabelText}>Revisão</Text>
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
        flex: 1,
    },
    leftContainer: {
        flexShrink: 1,
        marginRight: 'auto',
        flex: 1
    },
    revisionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
    },
    revisionLabelContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
    },
    revisionLabelText: {
        fontSize: 14,
    },
    rightButton: {
        padding: 10,
        borderRadius: 5,
        marginLeft: 200, // Adiciona um espaçamento entre o botão e o conteúdo da esquerda
    },
});

export default GeralRevisionCard;
