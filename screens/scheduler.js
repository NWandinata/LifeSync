import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

export default function SchedulerScreen({ navigation, route }) {
    const { date } = route.params;
    const [eventName, setEventName] = useState('');
    const [priority, setPriority] = useState(1);
    const [category, setCategory] = useState('Work');
    const [dueTime, setDueTime] = useState('12:00');
    const [events, setEvents] = useState([]);

    const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
    const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

    const addEvent = () => {
        if (eventName.trim() !== '') {
            const newEvent = {
                id: Math.random().toString(),
                name: eventName,
                priority: priority,
                category: category,
                dueTime: dueTime,
            };
            setEvents((currentEvents) => [...currentEvents, newEvent]);
            setEventName(''); // Clear the input

            // Pass event info, including dueTime, back to the calendar
            navigation.navigate("Calendar", { eventInfo: newEvent, newEvent: true });
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
                style={styles.categoryPicker}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="School" value="School" />
                <Picker.Item label="Exercise" value="Exercise" />
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Other" value="Other" />
            </Picker>

            <Text style={styles.label}>Set Due Time:</Text>
            <View style={styles.timePickerContainer}>
                <Picker
                    selectedValue={dueTime.split(':')[0]}
                    style={styles.timePicker}
                    onValueChange={(hour) => setDueTime(`${hour}:${dueTime.split(':')[1]}`)}
                >
                    {hours.map((hour) => (
                        <Picker.Item key={hour} label={hour} value={hour} />
                    ))}
                </Picker>
                <Text style={styles.timeSeparator}>:</Text>
                <Picker
                    selectedValue={dueTime.split(':')[1]}
                    style={styles.timePicker}
                    onValueChange={(minute) => setDueTime(`${dueTime.split(':')[0]}:${minute}`)}
                >
                    {minutes.map((minute) => (
                        <Picker.Item key={minute} label={minute} value={minute} />
                    ))}
                </Picker>
            </View>

            <Button title="Add Event" onPress={addEvent} />

            <FlatList
                style={styles.list}
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.eventItem}>
                        <Text>
                            Event: {item.name} | Priority: {item.priority} | Category: {item.category} | Due: {item.dueTime}
                        </Text>
                    </View>
                )}
            />
            <Text style={styles.selectedDateText}>Selected Date: {date}</Text>
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
    categoryPicker: {
        height: 40,
        width: '100%',
        marginBottom: 20,
    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timePicker: {
        flex: 1,
        height: 40,
    },
    timeSeparator: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 5,
        alignSelf: 'center',
    },
    list: {
        marginTop: 20,
    },
    eventItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    selectedDateText: {
        fontSize: 18,
        color: 'black',
        marginVertical: 10,
        textAlign: 'center',
    },
});
