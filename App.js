import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Slider, Picker } from 'react-native';

export default function App() {
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
      {/* Event Input */}
      <Text style={styles.label}>Event Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event name"
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />

      {/* Priority Slider */}
      <Text style={styles.label}>Priority (1-10): {priority}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={priority}
        onValueChange={(value) => setPriority(value)}
      />

      {/* Category Picker */}
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

      {/* Add Event Button */}
      <Button title="Add Event" onPress={addEvent} />

      {/* List of Events */}
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

import { View, Text, Button } from 'react-native';
import WheelPicker from 'react-native-wheel-picker-expo';

const SchedulerScreen = () => {
   const [startTime, setStartTime] = useState("08:00 AM");
   const [endTime, setEndTime] = useState("09:00 AM");

   // Array of times in the format "HH:MM AM/PM"
   const timeSlots = [
      "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM",
      "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM",
      "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
      "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
      "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
      "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
      "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
   ];

   return (
      <View style={{ flex: 1, padding: 20 }}>
         <Text>Select Start Time:</Text>
         <WheelPicker
            selectedValue={startTime}
            pickerData={timeSlots}
            onValueChange={(value) => setStartTime(value)}
         />

         <Text>Select End Time:</Text>
         <WheelPicker
            selectedValue={endTime}
            pickerData={timeSlots}
            onValueChange={(value) => setEndTime(value)}
         />

         <Button
            title="Add Event"
            onPress={() => {
               console.log("Start Time:", startTime);
               console.log("End Time:", endTime);
               
            }}
         />
      </View>
   );
};

