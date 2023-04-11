import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Text,
  Button,
  Checkbox,
  Card,
  IconButton,
  Portal,
  Menu,
  Divider,
} from "react-native-paper";
import { Circle, Svg } from "react-native-svg";
import AttedenceCard from "./AttendenceCard";

const AttendanceScreen = () => {
  const [subjects, setSubjects] = useState([
    { subject: "TQM", presentCount: 0, absentCount: 0, totalClasses: 0 },
    {
      subject: "Computer Networks",
      presentCount: 0,
      absentCount: 0,
      totalClasses: 0,
    },
    {
      subject: "Software Engineering",
      presentCount: 0,
      absentCount: 0,
      totalClasses: 0,
    },
  ]);
  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
    console.log("open");
  };
  const closeMenu = () => setVisible(false);

  const [overallPercentage, setOverallPercentage] = useState(0);

  const handleSubjectAttendanceChange = (index, presentCount, absentCount) => {
    const newSubjects = [...subjects];
    const totalClasses = presentCount + absentCount;
    const percentage = (presentCount / totalClasses) * 100;
    newSubjects[index].presentCount = presentCount;
    newSubjects[index].absentCount = absentCount;
    newSubjects[index].totalClasses = totalClasses;
    setSubjects(newSubjects);
    const totalPresent = newSubjects.reduce(
      (total, subject) => total + subject.presentCount,
      0
    );
    const totalAbsent = newSubjects.reduce(
      (total, subject) => total + subject.absentCount,
      0
    );
    const totalClassesAttended = totalPresent + totalAbsent;
    const overallPercentage = (totalPresent / totalClassesAttended) * 100;
    setOverallPercentage(overallPercentage);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View style={styles.header}>
                <Text>Goal</Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginLeft: 7 }}
                >
                  75%
                </Text>
              </View>
              <View style={styles.header}>
                <Text>Overall Attendance</Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginLeft: 7 }}
                >
                  {isNaN(overallPercentage)
                    ? "0%"
                    : `${Math.round(overallPercentage)}%`}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Svg style={styles.circle} width={70} height={60}>
                <Circle
                  cx="40"
                  cy="30"
                  r="27"
                  stroke={overallPercentage >= 75 ? "green" : "red"}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${overallPercentage} ${
                    100 - overallPercentage
                  }`}
                  strokeLinecap="square"
                />
                <Text style={styles.overallPercentage}>
                  {isNaN(overallPercentage)
                    ? "0%"
                    : `${Math.round(overallPercentage)}%`}
                </Text>
              </Svg>
              <IconButton
                onPress={openMenu}
                style={{ margin: -5 }}
                icon="dots-vertical"
              />
              <Portal>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <View style={{ position: "absolute", top: 0, right: 0 }}>
                      <IconButton icon="dots-vertical" />
                    </View>
                  }
                  style={{
                    marginTop: 40,
                    width: 200,
                    position: "absolute",
                    textColor: "black",
                  }}
                >
                  <Menu.Item
                    style={{ backgroundColor: "white", textColor: "black" }}
                    onPress={() => console.log("Option 1 selected")}
                    title="Option 1"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => console.log("Option 2 selected")}
                    title="Option 2"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => console.log("Option 3 selected")}
                    title="Option 3"
                  />
                </Menu>
              </Portal>
            </View>
          </View>
          <View>
            <Button
              mode="elevated"
              buttonColor="#198536"
              textColor="white"
              contentStyle={{
                height: 30,
                width: 100,
              }}
              labelStyle={{
                fontSize: 12,
              }}
              children="Add Subject"
              style={styles.button}
              compact
            />
          </View>
        </Card>
        {subjects.map((subject, index) => (
          <AttedenceCard
            key={subject.subject}
            subject={subject}
            onAttendanceChange={(presentCount, absentCount) =>
              handleSubjectAttendanceChange(index, presentCount, absentCount)
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 5,
    padding: 5,
  },
  circle: {
    height: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    borderLeftColor: "red",
    borderLeftWidth: 2,
  },
  overallPercentage: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: 22 }],
    fontWeight: "bold",
    fontSize: 14,
  },
  button: {
    margin: 4,
    width: 100,
  },
});

export default AttendanceScreen;
