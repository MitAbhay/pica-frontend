import React from "react";

import { BottomNavigation, Drawer, Text } from "react-native-paper";
import Attendance from "./Attendance/Attendance";
import Emergency from "./Emergency";
import Feedback from "./Feedback/Feedback";
import Result from "./Results";
import OpenElective from "./OpenElective";
import DrawerHome from "../../Components/DrawerHome";

const renderScene = BottomNavigation.SceneMap({
  attendance: Attendance,
  feedback: Feedback,
  result: Result,
  // openelective: OpenElective,
  emergency: Emergency,
});

export default function Home() {
  const [active, setActive] = React.useState("");

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "attendance",
      title: "Attendance",
      focusedIcon: "calendar",
      unfocusedIcon: "calendar",
    },
    { key: "feedback", title: "Feedback", focusedIcon: "album" },
    { key: "result", title: "Result", focusedIcon: "history" },
    // {
    //   key: "openelective",
    //   title: "Open Elective",
    //   focusedIcon: "bell",
    //   unfocusedIcon: "bell-outline",
    // },
    {
      key: "emergency",
      title: "Emergency",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  return (
    <>
      {/* <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          active={active === "first"}
          onPress={() => setActive("first")}
        />
        <Drawer.Item
          label="Second Item"
          active={active === "second"}
          onPress={() => setActive("second")}
        />
      </Drawer.Section> */}
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
}
