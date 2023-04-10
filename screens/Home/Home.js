import React from "react";

import { BottomNavigation, Text } from "react-native-paper";
import Attendence from "./Attendence/Attendence";
import Emergency from "./Emergency";
import Feedback from "./Feedback";
import Result from "./Results";
import OpenElective from "./OpenElective";

const renderScene = BottomNavigation.SceneMap({
  attendence: Attendence,
  feedback: Feedback,
  result: Result,
  // openelective: OpenElective,
  emergency: Emergency,
});

export default function Home() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "attendence",
      title: "Attendence",
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
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
