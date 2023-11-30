import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Card, TextInput, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import Envs from '../components/Envs';


const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(true); // Novo estado para loading

    const BACKEND_URL = Envs.BACKEND_URL;


    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null && token !== undefined) {
                    console.log(token);
                    navigation.navigate('Home'); // Navegar para Home se o token for válido
                } else {
                    setLoading(false); // Esconde o loading se o token for inválido ou não existir
                }
            } catch (error) {
                console.error("Erro ao verificar o token:", error);
                setLoading(false); // Esconde o loading em caso de erro
            }
        };
    
        checkToken();
    }, []);

    const login = async () => {
        try {
            const response = await fetch(BACKEND_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                throw new Error('Falha na resposta do servidor');
            }
    
            const data = await response.json();
            await AsyncStorage.setItem('token', data.access_token);
    
            // Salvar user_info no AsyncStorage
            if (data.user_info) {
                await AsyncStorage.setItem('userinfo', JSON.stringify(data.user_info));
            }
    
            navigation.navigate('Home'); // Navegar para Home após o login bem-sucedido
        } catch (error) {
            console.error("Falha no login:", error.message);
            // Aqui você pode adicionar uma mensagem de erro para o usuário, se necessário
        }
    };
    
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Tela de carregamento
    }
      
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
                    onPress={login} // Usar a função de login atualizada
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
            </Card>

            
            
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
        marginBottom: 20,
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
