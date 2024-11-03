import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

export default function Scheduler() {
    const [eventName, setEventName] = useState('');
    const [priority, setPriority] = useState(1);
    const [category, setCategory] = useState('Work');
    const [events, setEvents] = useState([]);

    const addEvent = () => {
        if (eventName.trim() !== '') {
            const newEvent = {
                id: Math.random().toString(),
                name: eventName,
                priority: priority,
                category: category
            };
            setEvents((currentEvents) => [...currentEvents, newEvent]);
            setEventName(''); // Clear the input
        } else {
            alert('Please enter an event name.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Event Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter event name"
                value={eventName}
                onChangeText={(text) => setEventName(text)}
            />

            <Text style={styles.label}>Priority (1-10): {priority}</Text>
            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={priority}
                onValueChange={(value) => setPriority(value)}
            />

            <Text style={styles.label}>Category:</Text>
            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="School" value="School" />
                <Picker.Item label="Exercise" value="Exercise" />
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Other" value="Other" />
            </Picker>

            <Button title="Add Event" onPress={addEvent} />

            <FlatList
                style={styles.list}
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.eventItem}>
                        <Text>
                            Event: {item.name} | Priority: {item.priority} | Category: {item.category}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    list: {
        marginTop: 20,
    },
    eventItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});
