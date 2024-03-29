import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Button,
  Text,
  IconButton,
  Menu,
  Divider,
} from "react-native-paper";
import { Svg, Circle } from "react-native-svg";

const AttedanceCard = (props) => {
  const navigation = useNavigation();
  const [presentCount, setPresentCount] = useState(props.subject.presentCount);
  const [absentCount, setAbsentCount] = useState(props.subject.absentCount);
  const [visible, setVisible] = useState(false);
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => setVisible(false);
  const handlePresentPress = () => {
    setPresentCount(presentCount + 1);
    setPresent(true);
    setAbsent(false);
    props.onAttendanceChange(presentCount + 1, absentCount);
  };

  const handleAbsentPress = () => {
    setAbsentCount(absentCount + 1);
    setPresent(false);
    setAbsent(true);
    props.onAttendanceChange(presentCount, absentCount + 1);
  };

  const handleUndo = () => {
    if (present === true) {
      setPresentCount(presentCount - 1);
      props.onAttendanceChange(presentCount - 1, absentCount);
    }
    if (absent === true) {
      setAbsentCount(absentCount - 1);
      props.onAttendanceChange(presentCount, absentCount - 1);
    }
    closeMenu();
  };

  const handleReset = () => {
    setPresentCount(0);
    setAbsentCount(0);
    props.onAttendanceChange(0, 0);
    closeMenu();
  };
  const percentage = (presentCount / (presentCount + absentCount)) * 100;
  const totalClasses = presentCount + absentCount;
  const remainingClasses = Math.ceil(
    (0.75 * (presentCount + absentCount) - presentCount) / 0.25
  );

  return (
    <Card
      onPress={() => navigation.navigate("AttendanceDetails", props.subject)}
      style={styles.card}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.header}>
          <Text style={styles.subject}>{props.subject.subject}</Text>
          <View style={styles.attendence}>
            <Text style={styles.attendenceText}>Attendance :</Text>
            <Text style={styles.count}>
              {presentCount}/{presentCount + absentCount}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Svg style={styles.circle} width={70} height={60}>
            <Circle
              cx="40"
              cy="30"
              r="27"
              stroke={percentage >= 75 ? "green" : "red"}
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${percentage} ${100 - percentage}`}
              strokeLinecap="square"
            />
            <Text style={styles.percentage}>
              {totalClasses == 0 ? "0%" : `${Math.round(percentage)}%`}
            </Text>
          </Svg>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                onPress={openMenu}
                style={{ margin: -5 }}
                icon="dots-vertical"
              />
            }
          >
            <Menu.Item onPress={() => handleUndo()} title="Undo" />
            <Menu.Item
              onPress={() => {
                props.onDeleteSubject();
              }}
              title="Delete"
            />
            {/* <Menu.Item onPress={() => {}} title="Edit" /> */}
            <Menu.Item onPress={() => handleReset()} title="Reset" />
          </Menu>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: 190,
            alignContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Status :</Text>
          <Text style={{ fontSize: 14, padding: 2 }}>
            {totalClasses == 0
              ? "No Classes started yet"
              : percentage >= 75
              ? "You are safe"
              : `Attend ${remainingClasses} more classes for 75%`}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="check"
            containerColor="green"
            iconColor="black"
            size={15}
            onPress={() => handlePresentPress()}
          />
          <IconButton
            icon="close"
            containerColor="red"
            iconColor="black"
            size={15}
            onPress={() => handleAbsentPress()}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  subject: {
    fontSize: 16,
    fontWeight: "bold",
  },
  attendenceText: {
    fontSize: 12,
    marginRight: 5,
  },
  count: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    paddingLeft: 4,
    borderLeftColor: "red",
    borderLeftWidth: 2,
  },
  card: {
    margin: 5,
    padding: 5,
  },
  attendence: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 20,
  },
  percentage: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: 22 }],
    fontWeight: "bold",
    fontSize: 14,
  },

  buttonContainer: {
    flexDirection: "row",
    marginRight: 15,
  },
  button: {
    margin: 3,
  },
});

export default AttedanceCard;
