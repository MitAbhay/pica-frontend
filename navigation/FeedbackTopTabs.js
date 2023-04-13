import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FacultyFeedback from "../screens/Home/Feedback/FacultyFeedback";
import HostelFeedback from "../screens/Home/Feedback/HostelFeedback";

const Tab = createMaterialTopTabNavigator();

export default function FeedbackTopTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Hostel"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 18 },
      }}
    >
      <Tab.Screen
        name="Hostel"
        component={HostelFeedback}
        options={{ tabBarLabel: "Hostel" }}
      />
      <Tab.Screen
        name="Faculty"
        component={FacultyFeedback}
        options={{ tabBarLabel: "Faculty" }}
      />
    </Tab.Navigator>
  );
}
