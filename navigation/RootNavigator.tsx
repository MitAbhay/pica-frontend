import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

import Login from "../screens/Auth/Login";
import { Register } from "../screens/Auth/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../screens/Start";
import Home from "../screens/Home/Home";
import CustomNavigationBar from "../Components/CustomNavigationBar";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        initialRouteName="Start"
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
