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

const AttedenceCard = (props) => {
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
    console.log("open");
  };
  const closeMenu = () => setVisible(false);
  const handlePresentPress = () => {
    setPresentCount(presentCount + 1);
    props.onAttendanceChange(presentCount + 1, absentCount);
  };

  const handleAbsentPress = () => {
    setAbsentCount(absentCount + 1);
    props.onAttendanceChange(presentCount, absentCount + 1);
  };

  const percentage = (presentCount / (presentCount + absentCount)) * 100;
  const totalClasses = presentCount + absentCount;
  const remainingClasses = Math.ceil(
    (0.75 * (presentCount + absentCount) - presentCount) / 0.25
  );

  return (
    <Card style={styles.card}>
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
            <Menu.Item onPress={() => {}} title="Undo" />
            <Menu.Item
              onPress={() => {
                props.onDeleteSubject();
              }}
              title="Delete Subject "
            />
            <Menu.Item onPress={() => {}} title="Edit" />
            <Menu.Item onPress={() => {}} title="Reset" />
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

export default AttedenceCard;
