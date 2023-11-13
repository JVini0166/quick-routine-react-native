import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';
import { useFocusEffect } from '@react-navigation/native';
import WeekdaySlider from '../../components/WeekdaySlider';


const Routine = ({ navigation }) => {
    const [hasSettings, setHasSettings] = useState(false);
    const [routineSettings, setRoutineSettings] = useState({});

    useFocusEffect(
        useCallback(() => {
            const checkSettings = async () => {
                const settingsString = await AsyncStorage.getItem('routinesettings');
                const settings = settingsString ? JSON.parse(settingsString) : null;
                if (settings) {
                    setHasSettings(true);
                    setRoutineSettings(settings);
                } else {
                    setHasSettings(false);
                }
            };

            checkSettings();
        }, [])
    );

    return (
        <LinearGradient 
            style={styles.container}
            colors={[colors.primary, colors.secondary]} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.topContainer}>
                <WeekdaySlider onDaySelect={(day) => console.log(day)} />
                {hasSettings ? (
                    <>
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>
                                    Início da Rotina - {routineSettings.startTime}
                                </Text>
                            </View>
                        </Card>
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>
                                    Fim da Rotina - {routineSettings.endTime}
                                </Text>
                            </View>
                        </Card>
                    </>
                ) : (
                    <Button
                        title="Configurar Rotina"
                        onPress={() => navigation.navigate('RoutineConfig')}
                    />
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
    },
    card: {
        width: '90%',
        marginVertical: 5,
        borderRadius: 8,
        height: '25%', // Ajuste a altura conforme necessário
        justifyContent: 'center',
    },
    cardContent: {
        alignItems: 'center',
        height: '100%',
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Routine;
