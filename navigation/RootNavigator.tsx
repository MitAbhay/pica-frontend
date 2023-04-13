import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

import Login from "../screens/Auth/Login";
import { Register } from "../screens/Auth/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../screens/Start";
import Home from "../screens/Home/Home";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import AttendanceDetails from "../screens/Home/Attendance/AttendanceDetails";

const Stack = createNativeStackNavigator();

const screenOptions = {
  header: (props) => <CustomNavigationBar {...props} />,
};

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Start">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Start"
          component={Start}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AttendanceDetails" component={AttendanceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
