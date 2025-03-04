import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { CalendarProvider, Agenda } from 'react-native-calendars';

const CalendarScreen = ({ navigation, route }) => {
    const [items, setItems] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [deletedCount, setDeletedCount] = useState(0);
    const eventName = route.params?.eventInfo?.name;
    const priority = route.params?.eventInfo?.priority;
    const category = route.params?.eventInfo?.category;

    const addEvent = (date, event) => {
        setItems((prevItems) => {
            const currentEvents = prevItems[date] || [];
            const updatedEvents = [...currentEvents, event];
            updatedEvents.sort((a, b) => b.priority - a.priority); // Sort by priority descending
            return {
                ...prevItems,
                [date]: updatedEvents,
            };
        });
    };

    const deleteEvent = (date, eventId) => {
        setItems((prevItems) => {
            const currentEvents = prevItems[date] || [];
            const updatedEvents = currentEvents.filter(event => event.id !== eventId);
            if (currentEvents.length > updatedEvents.length) {
                setDeletedCount((prevCount) => prevCount + 1);
            }
            return {
                ...prevItems,
                [date]: updatedEvents,
            };
        });
    };

    useEffect(() => {
        if (eventName && priority && category) {
            const newEvent = { id: Math.random().toString(), name: eventName, priority, category };
            addEvent(selectedDate, newEvent);
        }
    }, [route.params]);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const renderItem = (item) => (
        <View style={styles.item}>
            <View style={{ flex: 1 }}>
                <Text style={styles.eventText}>{item.name}</Text>
                <Text style={styles.eventDetail}>Priority: {item.priority}</Text>
                <Text style={styles.eventDetail}>Category: {item.category}</Text>
                <Text style={styles.eventDetail}>Due Time: {item.dueTime}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEvent(selectedDate, item.id)}>
                <Text style={styles.deleteButtonText}>Done!</Text>
            </TouchableOpacity>
        </View>
    );

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    const maxDateString = maxDate.toISOString().split('T')[0];

    return (
        <CalendarProvider>
            <View style={styles.container}>
                <Agenda
                    items={{ [selectedDate]: items[selectedDate] || [] }} // Show only items for the selected date
                    renderItem={renderItem}
                    selected={selectedDate}
                    onDayPress={onDayPress}
                    style={styles.agenda}
                    maxDate={maxDateString}
                />
                <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
                <Text style={styles.deletedCountText}>Total Events Finished: {deletedCount}</Text>
                <Button title="Schedule an Event" onPress={() => navigation.navigate("Scheduler", { date: selectedDate })} />
                <Button title="Go to Home" onPress={() => navigation.navigate("Home", { deletedCount })} />
            </View>
        </CalendarProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    agenda: { marginBottom: 20 },
    item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 10, marginHorizontal: 10, borderRadius: 5, flexDirection: 'row', alignItems: 'center' },
    eventText: { fontSize: 16, fontWeight: 'bold' },
    eventDetail: { fontSize: 14, color: '#555' },
    deleteButton: { marginLeft: 10, backgroundColor: '#008000', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
    deleteButtonText: { color: '#fff', fontWeight: 'bold' },
    selectedDateText: { fontSize: 18, color: 'black', marginVertical: 10, marginHorizontal: 80 },
    deletedCountText: { fontSize: 16, color: 'black', marginVertical: 10, textAlign: 'center' },
});

export default CalendarScreen;