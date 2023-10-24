import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Card, TextInput, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    

    
    return (
        <LinearGradient
        style={styles.gradient}
        colors={[colors.redLight, colors.blueLight, colors.greenLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
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
        </LinearGradient>
    );
}

const colors = {
    redLight: '#FF6B6B',
    blueLight: '#6BAAFF',
    greenLight: '#6BFFAA',
    blackC: '#000000'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,  // Fundo azul claro para todo o contêiner
    },
    
    card: {
        padding: 16,
        marginBottom: 20,
        backgroundColor: 'white',  // Para garantir que o cartão seja claramente visível contra o fundo
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#E2E2E2'
    },
    loginButton: {
        marginBottom: 10,
        backgroundColor: colors.redLight,  // Botão de login vermelho claro
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    linkText: {
        color: colors.black,  // Links de texto verde claro
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 270,
        marginBottom: 20,
    },
    gradient: {
        flex: 1
    },
});


export default Login;
