import { View, StyleSheet, Image } from 'react-native';

import { Button, TextField, Typography } from '@mui/material';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
    return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image
            source={{ uri: 'https://your_logo_url_here.com' }}
            style={styles.logo}
            />
        </View>
        <TextField
            label="Usuário"
            variant="outlined"
            style={styles.input}
        />
        <TextField
            label="Senha"
            variant="outlined"
            style={styles.input}
            secureTextEntry
        />
        
        <Button 
        variant="contained" 
        color="primary" 
        style={styles.loginButton}
        onClick={() =>
            navigation.navigate('Home', {name: 'Home'})
          }
        >
        Login
        </Button>
        
        <View style={styles.linkContainer}>
            <Typography variant="caption" style={styles.linkText}>
            Esqueci minha senha
            </Typography>
            <Typography variant="caption" style={styles.linkText}>
            Criar uma nova conta
            </Typography>
        </View>
        <View style={styles.socialLoginContainer}>
            <Button
            startIcon={<Icon name="logo-google" size={20} />}
            variant="outlined"
            style={styles.socialButton}
            >
            Google
            </Button>
            <Button
            startIcon={<Icon name="logo-facebook" size={20} />}
            variant="outlined"
            style={styles.socialButton}
            >
            Facebook
            </Button>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
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
    },
  });

export default Login;