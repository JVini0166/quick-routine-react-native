import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { Card, ProgressBar, DataTable } from 'react-native-paper';
import { ProgressChart } from 'react-native-chart-kit';

const HabitProgress = ({ navigation, route }) => {
    const habit = route.params;
    const screenWidth = Dimensions.get("window").width;

    // Progress Counter
    const initDateObj = new Date(habit.initDate);
    const targetDateObj = new Date(habit.targetDate);
    const totalTime = targetDateObj - initDateObj;
    

    const progress = Math.min(elapsedTime / totalTime, 1);

    // ProgressChart
    const completedDays = habit.history.filter(entry => entry.value === 1).length;
    const progressPercentage = completedDays / habit.history.length;
    const data = {
        data: [progressPercentage],
    };
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    };

    // Consecutive Days
    const consecutiveDays = (history) => {
        let count = 0;
        const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
        for (const entry of sortedHistory) {
            if (entry.value === 1) {
                count++;
            } else {
                break;
            }
        }
        return count;
    };
    const currentConsecutive = consecutiveDays(habit.history);
    const highestConsecutive = Math.max(currentConsecutive, /* previous highest consecutive (from database or state) */ 0);

    // DataTable
    const today = new Date();
    const elapsedTime = today - initDateObj;
    const thisWeekCount = habit.history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entry.value === 1 && (today - entryDate) <= 7 * 24 * 60 * 60 * 1000;
    }).length;

    const thisMonthCount = habit.history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entry.value === 1 && entryDate.getMonth() === today.getMonth();
    }).length;

    const thisYearCount = habit.history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entry.value === 1 && entryDate.getFullYear() === today.getFullYear();
    }).length;

    return (
        <View style={styles.container}>
            {/* ProgressChart Card */}
            <Card style={styles.card}>
                <Card.Content>
                    <ProgressChart
                        data={data}
                        width={screenWidth - 80}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </Card.Content>
            </Card>
            {/* Progress Counter Card */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text>Progress Counter</Text>
                    <ProgressBar progress={progress} />
                    <Text style={styles.dateText}>
                        {habit.initDate ? habit.initDate.slice(0, 10) : "Data não disponível"}
                    </Text>
                    <Text style={styles.dateText}>
                        {habit.targetDate ? habit.targetDate.slice(0, 10) : "Data não disponível"}
                    </Text>
                </Card.Content>
            </Card>
            {/* Consecutive Days Card */}
            <Card style={styles.card}>
                <Card.Content style={styles.consecutiveDaysCard}>
                    <View style={styles.consecutive}>
                        <Text>Atual</Text>
                        <Text>{currentConsecutive}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.consecutive}>
                        <Text>Melhor</Text>
                        <Text>{highestConsecutive}</Text>
                    </View>
                </Card.Content>
            </Card>
            {/* DataTable Card */}
            <Card style={styles.card}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Vezes Concluído</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell>Essa Semana</DataTable.Cell>
                        <DataTable.Cell numeric>{thisWeekCount}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Esse Mês</DataTable.Cell>
                        <DataTable.Cell numeric>{thisMonthCount}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Esse ano</DataTable.Cell>
                        <DataTable.Cell numeric>{thisYearCount}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Total</DataTable.Cell>
                        <DataTable.Cell numeric>{completedDays}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        marginBottom: 15,
    },
    consecutiveDaysCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    consecutive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: 'grey',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10, // padding added for more spacing
        backgroundColor: 'white',  // background color to ensure visibility
        borderRadius: 5,  // round the corners a bit
        elevation: 1  // small shadow for better distinction
    },
    
    dateText: {
        fontSize: 10,  // slightly bigger font size
        color: 'grey'
    },
});

export default HabitProgress;
