import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';
import { useFocusEffect } from '@react-navigation/native';
import RoutineCard from '../../components/RoutineCard';


const Routine = ({ navigation }) => {
    const [hasSettings, setHasSettings] = useState(false);
    const [routineSettings, setRoutineSettings] = useState({});

    const [selectedDay, setSelectedDay] = useState(null);
    const [dailyRoutines, setDailyRoutines] = useState([]);

    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    const handleRoutineSelect = (routine) => {
        setSelectedRoutine(routine);
        setBottomSheetVisible(true);
    };

    const handleDeleteRoutine = async (routineId) => {
    try {
        const routineDataString = await AsyncStorage.getItem('routine');
        if (routineDataString) {
            let routineData = JSON.parse(routineDataString);

            // Itera sobre cada dia da semana e remove a rotina com o ID correspondente
            Object.keys(routineData).forEach(day => {
                routineData[day] = routineData[day].filter(item => item.id !== routineId);
            });

            // Salva os dados atualizados de volta no AsyncStorage
            await AsyncStorage.setItem('routine', JSON.stringify(routineData));
        }
    } catch (error) {
        console.error("Erro ao excluir a rotina:", error);
    }

    setBottomSheetVisible(false);
    fetchDailyRoutines()
};
    

    const renderBottomSheet = () => {
        if (bottomSheetVisible && selectedRoutine) {
            return (
                <View style={styles.overlay}>
                    <TouchableOpacity 
                        style={styles.fullScreenContainer} 
                        onPress={() => setBottomSheetVisible(false)}
                    >
                        <View style={styles.bottomSheet}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EditRoutineItem', selectedRoutine);
                                setBottomSheetVisible(false);
                            }}>
                                <Text>Editar Rotina</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteRoutine(selectedRoutine.id)} style={{ marginTop: 10 }}>
                                <Text style={{ color: 'red' }}>Excluir Rotina</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    const fetchDailyRoutines = () => {
        const today = new Date();
        today.setHours(today.getHours() - 3); // Ajuste para o fuso horário de Brasília
        const dayIndex = today.getDay();
        const dayName = weekdays[dayIndex];
        setSelectedDay(dayName); // Configura o dia selecionado inicialmente
        const lowerCaseDay = dayName.toLowerCase();
        updateDailyRoutines(lowerCaseDay);
    }

    useFocusEffect(
        useCallback(() => {
            
            fetchDailyRoutines()

            return () => {
                // Limpar efeitos ou listeners se necessário ao sair da tela.
            };
        }, [])
    );

    const handleSelectDay = (day) => {
        const lowerCaseDay = day.toLowerCase();
        updateDailyRoutines(lowerCaseDay);
        setSelectedDay(day);
    };

    const WeekdayBox = ({ day }) => {
        const isSelected = day === selectedDay;
        return (
            <TouchableOpacity
                style={[styles.weekdayBox, isSelected && styles.selectedBox]}
                onPress={() => handleSelectDay(day)}
            >
                <Text>{day}</Text>
            </TouchableOpacity>
        );
    };
    
    const updateDailyRoutines = async (day) => {
        const routineString = await AsyncStorage.getItem('routine');
        const routine = routineString ? JSON.parse(routineString) : {};
        if (day && routine[day]) {
            setDailyRoutines(routine[day]);
        } else {
            setDailyRoutines([]);
        }
    };

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
                <ScrollView
                    horizontal={true}
                    style={styles.weekdayContainer}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                >
                    {weekdays.map((day, index) => (
                        <WeekdayBox key={index} day={day} />
                    ))}
                </ScrollView>
                {hasSettings ? (
                    <>
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>
                                    Início da Rotina - {routineSettings.startTime}
                                </Text>
                            </View>
                        </Card>
                        <ScrollView style={styles.routineList}>
                            {dailyRoutines.length > 0 ? (
                                dailyRoutines.sort((a, b) => a.initHour.localeCompare(b.initHour)).map((item, index) => (
                                    <TouchableOpacity
                                        key={`${item.name}-${index}`}
                                        onPress={() => handleRoutineSelect(item)}
                                    >
                                        <RoutineCard item={item} />
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.noRoutineText}>Nenhum item de rotina para este dia.</Text>
                            )}
                        </ScrollView>
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
            {hasSettings && (
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => navigation.navigate('CreateRoutineItem', { name: 'CreateRoutineItem' })}
                />
            )}
            {renderBottomSheet()}
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
        height: 40,
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
    routineList: {
        width: '80%',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0, 
        backgroundColor: colors.fab
    },
    noRoutineText: {
        textAlign: 'center',
    },
    weekdayContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    weekdayBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedBox: {
        borderColor: 'green',
        backgroundColor: 'lightgreen', // ou outra cor para destacar o dia selecionado
    },
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
});

export default Routine;
