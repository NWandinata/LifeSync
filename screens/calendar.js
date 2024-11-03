import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CalendarProvider, Agenda } from 'react-native-calendars';

const CalendarScreen = () => {
    const [items, setItems] = useState({});

    const loadItems = (day) => {
        const newItems = {};
        const time = day.timestamp;
        const strTime = day.dateString;

        // Mock data: populate agenda items for the selected date
        newItems[strTime] = [{ name: 'Item 1', height: 50 }, { name: 'Item 2', height: 50 }];

        // Update state with the new items
        setItems((prevItems) => {
            return { ...prevItems, ...newItems };
        });
    };

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text>{item.name}</Text>
            </View>
        );
    };

    return (
        <CalendarProvider>
            <View style={styles.container}>
                <Agenda
                    items={items}
                    loadItemsForMonth={loadItems}
                    renderItem={renderItem}
                    selected={new Date().toISOString().split('T')[0]} // Default selected date
                    style={styles.agenda}
                />
            </View>
        </CalendarProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    agenda: {
        marginBottom: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
});

export default CalendarScreen;