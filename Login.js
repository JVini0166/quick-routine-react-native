import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextField, IconButton, InputAdornment, Button, Typography } from '@mui/material';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState }  from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({navigation}) => {

   const [username, setUsername] = useState('');

   const [password, setPassword] = useState('');

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
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
          <TouchableOpacity onPress={() => navigation.navigate('/forgotpassword')}>
              <Typography variant="caption" style={styles.linkText}>
                  Esqueci minha senha
              </Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Typography variant="caption" style={styles.linkText}>
                  Criar uma nova conta
              </Typography>
          </TouchableOpacity>
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