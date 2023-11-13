
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Card, FAB } from 'react-native-paper';
import colors from '../../components/colors';

const Tasks = ({navigation}) => {
    return (
        <LinearGradient 
            style={styles.container}
            colors={[colors.primary, colors.secondary]} // DarkGreen to LimeGreen
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        <View style={styles.container}>
            <ScrollView style={styles.cardsContainer}>
                    
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateTask', { name: 'CreateTask' })}
            />
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    cardsContainer: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0, 
        backgroundColor: colors.fab
    },
});

export default Tasks;