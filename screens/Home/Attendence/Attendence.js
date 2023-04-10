import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Checkbox } from "react-native-paper";
import AttedenceCard from "./AttendenceCard";

const AttendanceScreen = () => {
  const [attendance, setAttendance] = useState([
    { subject: "Maths", days: [false, false, false, false, false] },
    { subject: "Science", days: [false, false, false, false, false] },
    { subject: "English", days: [false, false, false, false, false] },
  ]);
  return (
    <View style={styles.container}>
      <AttedenceCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  subject: {
    flex: 1,
  },
  day: {
    width: 40,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default AttendanceScreen;
