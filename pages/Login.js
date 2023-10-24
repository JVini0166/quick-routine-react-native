import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Card, TextInput, FAB } from 'react-native-paper';


const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <ScrollView style={styles.container}>
        
            <Card style={styles.card}>
            <View style={styles.logoContainer}>
            <Image source={require('../assets/quickroutine-logo.png')} style={styles.logo} />
            </View>
                <TextInput
                    label="Usuário"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />

                <TextInput
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    right={
                        <TextInput.Icon
                            name={showPassword ? "eye-off" : "eye"}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />

                <Button 
                    mode="contained" 
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Home', { name: 'Home' })}
                >
                    Login
                </Button>

                <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.linkText}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                        <Text style={styles.linkText}>Criar uma nova conta</Text>
                    </TouchableOpacity>
                </View>
            </Card>

            <View style={styles.socialLoginContainer}>
                <Button
                    icon="google"
                    mode="outlined"
                    style={styles.socialButton}
                    onPress={() => {
                        // Integrate Google login here
                    }}
                >
                    Google
                </Button>
                <Button
                    icon="facebook"
                    mode="outlined"
                    style={styles.socialButton}
                    onPress={() => {
                        // Integrate Facebook login here
                    }}
                >
                    Facebook
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    
    card: {
        padding: 16,
        marginBottom: 20,
    },
    input: {
        marginBottom: 20,
    },
    loginButton: {
        marginBottom: 10,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    linkText: {
        color: '#007BFF',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 0.48,
        marginBottom: 20,
    },
    logoContainer: {
        flex: 1, // Isso garante que o container ocupe todo o espaço disponível
        justifyContent: 'center', // Alinha verticalmente no centro
        alignItems: 'center',     // Alinha horizontalmente no centro
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 270,
        marginBottom: 20,  // Use marginBottom em vez de paddingBottom para dar espaço abaixo da imagem
    },
});

export default Login;
