import { useRoute } from "@react-navigation/native";
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
  Provider,
  Modal,
  TextInput,
} from "react-native-paper";
import { Circle, Svg } from "react-native-svg";
import AttedanceCard from "./AttendanceCard";

const AttendanceScreen = ({ navigation }) => {
  const route = useRoute();
  console.log(route.params);
  const [subjects, setSubjects] = useState([
    {
      subject: "Software Engineering",
      presentCount: 5,
      absentCount: 0,
      presentDates: ["2023-04-12", "2023-04-14", "2023-04-11", "2023-04-10"],
      absentDates: [],
      totalClasses: 0,
    },
    {
      subject: "Computer Networks",
      presentCount: 0,
      absentCount: 9,
      presentDates: [],
      absentDates: [],
      totalClasses: 0,
    },
    {
      subject: "Distributed Systems",
      presentCount: 0,
      absentCount: 0,
      presentDates: [],
      absentDates: [],
      totalClasses: 0,
    },
    {
      subject: "Digital Image Processing",
      presentCount: 0,
      absentCount: 0,
      presentDates: [],
      absentDates: [],
      totalClasses: 0,
    },
  ]);

  const [newSubject, setNewSubject] = useState({
    subject: "",
    presentCount: 0,
    absentCount: 0,
    totalClasses: 0,
  });

  const handleSubjectNameChange = (text) => {
    setNewSubject((prevSubject) => ({ ...prevSubject, subject: text }));
  };
  const handleTotalPresentChange = (text) => {
    setNewSubject((prevSubject) => ({
      ...prevSubject,
      presentCount: Number(text),
    }));
  };
  const handleTotalAbsentChange = (text) => {
    // console.log(typeof Number(text));
    setNewSubject((prevSubject) => ({
      ...prevSubject,
      absentCount: Number(text),
    }));
  };

  const handleAddSubject = () => {
    const { subject, presentCount, absentCount } = newSubject;
    if (subject && presentCount && absentCount) {
      const newSubjects = [
        ...subjects,
        {
          subject,
          presentCount,
          absentCount,
          totalClasses: presentCount + absentCount,
        },
      ];
      setSubjects(newSubjects);
      setNewSubject({
        subject: "",
        presentCount: 0,
        absentCount: 0,
        totalClasses: 0,
      });
      hideModal();
    }
  };

  const handleDeleteSubject = (index) => {
    handleSubjectAttendanceChange(index, 0, 0);
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };
  const [menuvisible, setmenuVisible] = useState(false);
  const openMenu = () => {
    setmenuVisible(true);
  };
  const closeMenu = () => setmenuVisible(false);

  const [modalvisible, setmodalVisible] = React.useState(false);

  const showModal = () => setmodalVisible(true);
  const hideModal = () => setmodalVisible(false);

  const [overallPercentage, setOverallPercentage] = useState(0);

  const handleSubjectAttendanceChange = (index, presentCount, absentCount) => {
    // console.log(index);
    const newSubjects = [...subjects];
    const totalClasses = presentCount + absentCount;
    const percentage = (presentCount / totalClasses) * 100;
    const today = new Date().toISOString().slice(0, 10);
    if (presentCount > newSubjects[index].presentCount) {
      newSubjects[index].presentDates.push(today);
    } else if (absentCount > newSubjects[index].absentCount) {
      newSubjects[index].absentDates.push(today);
    }
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
    console.log(subjects);
  };

  return (
    <View style={styles.container}>
      <Card elevation={5} style={styles.card}>
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
              <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 7 }}>
                75%
              </Text>
            </View>
            <View style={styles.header}>
              <Text>Overall Attendance</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 7 }}>
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
            <Menu
              visible={menuvisible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  onPress={openMenu}
                  style={{ margin: -5 }}
                  icon="dots-vertical"
                />
              }
            >
              <Menu.Item onPress={() => {}} title="Edit Goal" />
              {/* <Menu.Item onPress={() => {}} title="Item 2" /> */}
              {/* <Divider /> */}
              {/* <Menu.Item onPress={() => {}} title="Item 3" /> */}
            </Menu>
          </View>
        </View>
        <View>
          <Button
            style={styles.button}
            buttonColor="green"
            mode="contained"
            onPress={() => showModal()}
          >
            Add Subject
          </Button>
          <Portal>
            <Modal
              style={{
                padding: 10,
                margin: 30,
                marginTop: 270,
                backgroundColor: "white",
                height: 300,
                borderRadius: 10,
              }}
              visible={modalvisible}
              onDismiss={hideModal}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  Add Subject
                </Text>
                <TextInput
                  label="Subject name"
                  value={newSubject.subject}
                  onChangeText={handleSubjectNameChange}
                />
                <TextInput
                  type={Number}
                  label="Total Present"
                  keyboardType="numeric"
                  value={newSubject.presentCount}
                  onChangeText={handleTotalPresentChange}
                />
                <TextInput
                  type={Number}
                  label="Total Absent"
                  keyboardType="numeric"
                  value={newSubject.absentCount}
                  onChangeText={handleTotalAbsentChange}
                />
                <Button
                  style={{ marginTop: 10 }}
                  mode="contained"
                  onPress={handleAddSubject}
                >
                  Add
                </Button>
              </View>
            </Modal>
          </Portal>
        </View>
      </Card>
      <ScrollView>
        {subjects.map((subject, index) => (
          <AttedanceCard
            key={subject.subject}
            subject={subject}
            onAttendanceChange={(presentCount, absentCount) =>
              handleSubjectAttendanceChange(index, presentCount, absentCount)
            }
            onDeleteSubject={() => {
              handleDeleteSubject(index);
            }}
          />
        ))}
      </ScrollView>
    </View>
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
    width: 150,
  },
});

export default AttendanceScreen;
