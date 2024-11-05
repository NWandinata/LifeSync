import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { CalendarProvider, Agenda } from 'react-native-calendars';

// Dev Note: Update + Optimize day loading (limit days loaded since they must be loaded as empty)
const CalendarScreen = ({ navigation, route }) => {
    const [items, setItems] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const eventName = route.params?.eventInfo.name;
    const priority = route.params?.eventInfo.priority;
    const category = route.params?.eventInfo.category;

    const loadItems = (day) => {
        const newItems = {};
        const strDay = day.dateString;

        // Ensure that empty days are initialized with empty arrays to prevent infinite loading
        if (!items[strDay]) {
            newItems[strDay] = [];
        }

        // Update state with the new items (ensuring no empty dates are left)
        setItems((prevItems) => {
            return { ...prevItems, ...newItems };
        });
    };

    // Add a new event to the agenda
    const addEvent = (date, event) => {
        setItems((prevItems) => {
            // Check if the date already has events
            const currentEvents = prevItems[date] || [];

            // Add the new event to the current list of events
            const updatedEvents = [...currentEvents, event];

            // Update the events for the specific date
            return {
                ...prevItems,
                [date]: updatedEvents,
            };
        });
    };

    // Add event automatically when returning from Scheduler if there's event data
    useEffect(() => {
        if (eventName && priority && category) {
            const newEvent = {
                name: eventName,
                priority,
                category,
            };

            // Add the event to the selected date
            addEvent(selectedDate, newEvent);
        }
    }, [route.params]);  // Trigger the effect whenever route.params changes (ie. a new event gets added)

    // Finds the day the user selects
    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    // Render the item with priority and category
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.eventText}>{item.name}</Text>
                <Text style={styles.eventDetail}>Priority: {item.priority}</Text>
                <Text style={styles.eventDetail}>Category: {item.category}</Text>
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
                    selected={new Date().toISOString().split('T')[0]}
                    onDayPress={onDayPress}
                    style={styles.agenda}
                />
                <Text style={styles.selectedDateText}>
                    Selected Date: {selectedDate}
                </Text>
                <Button title="Schedule an Event" onPress={() => navigation.navigate("Scheduler", { date: selectedDate })} />
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
    selectedDateText: {
        fontSize: 18,
        color: 'black',
        marginVertical: 10,
        marginHorizontal: 80,
    },
});

export default CalendarScreen;