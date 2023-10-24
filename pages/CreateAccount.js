import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


const CreateAccount = ({ navigation }) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const BACKEND_URL = "https://5000-jvini0166-quickroutinef-ha2qe54cevf.ws-us105.gitpod.io/quick-routine"

    const handleRegister = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/create_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: `${name} ${surname}`,
                    password: password,
                    email: email,
                }),
            });

            const data = await response.json();

            if(response.ok) {
                alert(data.message);
                // Optionally navigate to another screen if needed
                // navigation.navigate('SomeScreen');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert('Error registering user: ' + error.message);
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
});

export default CreateAccount;
