import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../components/colors';


const Perfil = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        name: '',
        surname: '',
        email: ''
    });

    // Função para lidar com a atualização dos dados do perfil
    const handleUpdate = async () => {
        try {
            // Obtém as informações atuais do usuário do AsyncStorage
            const storedUserInfo = await AsyncStorage.getItem('userinfo');
            let currentUserInfo = JSON.parse(storedUserInfo);

            // Atualiza apenas o nome e sobrenome
            currentUserInfo = {
                ...currentUserInfo,
                name: userInfo.name,
                surname: userInfo.surname
            };

            // Salva as informações atualizadas no AsyncStorage
            await AsyncStorage.setItem('userinfo', JSON.stringify(currentUserInfo));
            alert("Perfil atualizado com sucesso!"); // Notifica o usuário sobre a atualização bem-sucedida
        } catch (error) {
            // Em caso de erro, exibe uma mensagem
            alert("Erro ao atualizar o perfil.");
        }
    };

    useEffect(() => {
        const loadUserInfo = async () => {
            const storedUserInfo = await AsyncStorage.getItem('userinfo');
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo));
            }
        };

        loadUserInfo();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.profileIconContainer}>
                <Avatar.Icon size={100} icon="account" />
            </View>
            
            <TextInput
                label="Nome de Usuário"
                mode="outlined"
                style={[styles.input, styles.nonEditableInput]}
                value={userInfo.username}
                editable={false}
            />

            <TextInput
                label="Nome"
                mode="outlined"
                style={styles.input}
                value={userInfo.name}
                onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />

            <TextInput
                label="Sobrenome"
                mode="outlined"
                style={styles.input}
                value={userInfo.surname}
                onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
            />

            <TextInput
                label="Email"
                mode="outlined"
                style={[styles.input, styles.nonEditableInput]}
                value={userInfo.email}
                editable={false}
            />

            <Button 
                mode="contained" 
                style={styles.updateButton}
                onPress={handleUpdate}
            >
                Atualizar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileIconContainer: {
        alignItems: 'center',
        marginBottom: 20,
        color: 'orange',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#f5f5f5', // Um cinza claro quase branco
        color: 'black', // Certifique-se de que a cor do texto seja legível
        borderRadius: 10,
    },
    nonEditableInput: {
        backgroundColor: '#e0e0e0', // Cinza claro para indicar campo não editável
    },
    updateButton: {
        alignSelf: 'center',
    },
});


export default Perfil;
