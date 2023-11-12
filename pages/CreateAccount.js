import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


const CreateAccount = ({ navigation }) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const [responseMessage, setResponseMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const BACKEND_URL = "https://5000-jvini0166-quickroutinef-72i8dbpw89n.ws-us106.gitpod.io/quick-routine"

    const handleRegister = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/create_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    name: name,
                    surname: surname, 
                    login_method: 'app'
                }),
            });

            const data = await response.json();

            if(response.ok) {
                setResponseMessage(data.message);
                setTimeout(() => navigation.navigate('Login'), 3000); // Navega para Login após 3 segundos
            } else {
                setResponseMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setResponseMessage('Error registering user: ' + error.message);
        }
    }


    return (
        <View style={styles.container}>
            <TextInput
                label="Nome"
                mode="outlined"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                label="Sobrenome"
                mode="outlined"
                style={styles.input}
                value={surname}
                onChangeText={setSurname}
            />

            <TextInput
                label="Nome de Usuário"
                mode="outlined"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                label="Senha"
                mode="outlined"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                right={<TextInput.Icon name={() => <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={20} />} onPress={() => setShowPassword(!showPassword)} />}
            />

            <TextInput
                label="Confirme sua Senha"
                mode="outlined"
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                right={<TextInput.Icon name={() => <MaterialIcons name={showConfirmPassword ? "visibility-off" : "visibility"} size={20} />} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
            />

            <Button 
            mode="contained" 
            style={styles.registerButton}
            onPress={handleRegister}
            >
            Registrar
            </Button>
            {responseMessage !== '' && (
                <Text style={styles.responseMessage}>{responseMessage}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
    },
    input: {
      marginBottom: 20,
    },
    registerButton: {
      marginBottom: 10,
      alignSelf: 'center',
    },
    responseMessage: {
        marginTop: 20,
        textAlign: 'center',
        color: 'red', // Ajuste a cor conforme necessário
    },
});

export default CreateAccount;
