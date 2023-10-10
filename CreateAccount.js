import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';;
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


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
            <TextField
                label="Nome"
                variant="outlined"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                label="Sobrenome"
                variant="outlined"
                style={styles.input}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />

            <TextField
                label="Email"
                variant="outlined"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label="Senha"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <TextField
                label="Confirme sua Senha"
                variant="outlined"
                type={showConfirmPassword ? 'text' : 'password'}
                style={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <Button 
            variant="contained" 
            color="primary" 
            style={styles.registerButton}
            onClick={handleRegister}
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
