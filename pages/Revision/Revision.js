import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';


const Revision = ({navigation}) => {

    const RevisionCard = ({ Revision }) => (
        <Card style={styles.card}>
            <Text>{Revision.name}</Text>
            <Button onPress={() => { /* Logic to mark task as completed */ }}>Concluir</Button>
        </Card>
    );

    const [revisions, setRevision] = useState([]);
    return (
        <View style={styles.container}>
            {/* ... Rest of the date selection code ... */}
            
            <ScrollView style={styles.cardsContainer}>
                {revisions.map(revision => 
                    <HabitCard key={revision.id} revision={revision} />
                )}
            </ScrollView>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateRevision', {name: 'CreateRevision'})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Isso garante que o ScrollView não expanda
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
        bottom: 0, // Isso deve empurrar o FAB para o canto inferior
    },
})

export default Revision;