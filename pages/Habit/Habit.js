import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HabitCard from '../../components/HabitCard';


const Habit = ({navigation}) => {

    const [habits, setHabits] = useState([]);

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const fetchHabits = async () => {
        let storedHabits = await AsyncStorage.getItem('habits');
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        }
    };

    const deleteHabit = async (id) => {
        let existingHabits = await AsyncStorage.getItem('habits');
        existingHabits = existingHabits ? JSON.parse(existingHabits) : [];
        
        const updatedHabits = existingHabits.filter(h => h.id !== id);
        
        await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));

        fetchHabits();
        
        setBottomSheetVisible(false);
        setSelectedHabit(null);
    };

    useFocusEffect(
        useCallback(() => {
            
            fetchHabits();

            return () => {
                // Limpar efeitos ou listeners se necessário ao sair da tela.
            };
        }, [])
    );

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const renderDeleteConfirmModal = () => {
        if (confirmDeleteVisible && selectedHabit) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text>Deseja mesmo excluir o hábito?</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Button onPress={() => setConfirmDeleteVisible(false)}>
                                Não
                            </Button>
                            <Button 
                                onPress={() => {
                                    deleteHabit(selectedHabit.id);
                                    setConfirmDeleteVisible(false);
                                }} 
                                style={{ marginLeft: 10 }}>
                                Sim
                            </Button>
                        </View>
                    </View>
                </View>
            );
        }
        return null;
    };
    
    
    const renderBottomSheet = () => {
        if (bottomSheetVisible && selectedHabit) {
            return (
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.fullScreenContainer} onPress={() => setBottomSheetVisible(false)}>
                        <View style={styles.bottomSheet}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EditHabit', selectedHabit);
                                setBottomSheetVisible(false);
                            }}>
                                <Text>Editar Hábito</Text>
                            </TouchableOpacity>
    
                            <TouchableOpacity 
                                onPress={() => setConfirmDeleteVisible(true)} 
                                style={{ marginTop: 10 }}>
                                <Text style={{ color: 'red' }}>Excluir Hábito</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };
    
    

    return (
        <View style={styles.container}>
            {/* ... Rest of the date selection code ... */}
            
            <ScrollView style={styles.cardsContainer}>
                {habits.map(habit => 
                    <HabitCard 
                    key={habit.id} 
                    habit={habit} 
                    navigation={navigation}
                    onSelect={() => {
                        setSelectedHabit(habit);
                        setBottomSheetVisible(true);
                    }}
                />
                )}
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateHabit', {name: 'CreateHabit'})}
            />

            {renderBottomSheet()}
            {renderDeleteConfirmModal()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
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
    fullScreenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
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
    }
    
});

export default Habit;