import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import RevisionCard from '../../components/RevisionCard';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../components/colors';

const Revision = ({ navigation }) => {
    const [revisions, setRevisions] = useState([]);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedRevision, setSelectedRevision] = useState(null);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);


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

    const renderDeleteConfirmModal = () => {
        if (confirmDeleteVisible && selectedRevision) {
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
                                    deleteRevision(selectedRevision.id);
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

    const deleteRevision = async (id) => {
        let existingRevisions = await AsyncStorage.getItem('revisions');
        existingRevisions = existingRevisions ? JSON.parse(existingRevisions) : [];
        
        const updatedRevisions = existingRevisions.filter(r => r.id !== id);
        
        await AsyncStorage.setItem('revisions', JSON.stringify(updatedRevisions));
        fetchRevisions();
        setConfirmDeleteVisible(false);
        setBottomSheetVisible(false);
    };

    const renderBottomSheet = () => {
        if (bottomSheetVisible && selectedRevision) {
            return (
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.fullScreenContainer} onPress={() => setBottomSheetVisible(false)}>
                        <View style={styles.bottomSheet}>
                            {/* Exemplo de uma opção no BottomSheet */}
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EditRevision', selectedRevision);
                                setBottomSheetVisible(false);
                            }}>
                                <Text>Editar Revisão</Text>
                            </TouchableOpacity>
    
                            {/* Opção Ver Progresso */}
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('RevisionProgress', selectedRevision.id);
                                setBottomSheetVisible(false);
                            }} style={{ marginTop: 10 }}>
                                <Text>Ver Progresso</Text>
                            </TouchableOpacity>
    
                            {/* Opção Excluir Revisão */}
                            <TouchableOpacity onPress={() => {
                                deleteRevision(selectedRevision.id);
                                setConfirmDeleteVisible(true);
                            }} style={{ marginTop: 10 }}>
                                <Text style={{ color: 'red' }}>Excluir Revisão</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };
    

    useFocusEffect(
        useCallback(() => {
            fetchRevisions();
            return () => { /* Limpar efeitos ao sair da tela */ };
        }, [])
    );

    return (
        <LinearGradient 
            style={styles.container}
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        <View style={styles.container}>
            <ScrollView style={styles.cardsContainer}>
                {revisions.map((revision) => (
                    <TouchableOpacity
                        key={revision.id}
                        onPress={() => {
                            setSelectedRevision(revision);
                            setBottomSheetVisible(true);
                        }}
                    >
                        <RevisionCard revision={revision} />
                    </TouchableOpacity>
                    
                ))}
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateRevision')}
            />

            {renderBottomSheet()}
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0, 
        backgroundColor: colors.fab
    },
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    // Adicione mais estilos aqui conforme necessário
});

export default Revision;
