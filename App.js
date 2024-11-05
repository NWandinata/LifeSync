import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "./screens/calendar";
import SchedulerScreen from "./screens/scheduler"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calendar">
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Scheduler" component={SchedulerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}