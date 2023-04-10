import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { Svg, Circle } from "react-native-svg";

const AttedenceCard = () => {
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  const handlePresentPress = () => {
    setPresentCount(presentCount + 1);
  };

  const handleAbsentPress = () => {
    setAbsentCount(absentCount + 1);
  };

  const percentage = (presentCount / (presentCount + absentCount)) * 100;
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.subject}>Maths</Text>
      </View>
      <Card.Content>
        <View style={styles.graph}>
          <View style={styles.attendence}>
            <Text style={styles.attendenceText}>Attendance :</Text>
            <Text style={styles.count}>
              {presentCount}/{presentCount + absentCount}
            </Text>
          </View>
          <Svg style={styles.circle} width={100} height={100}>
            <Circle
              cx="50"
              cy="50"
              r="30"
              stroke="#2196F3"
              strokeWidth="5"
              fill="none"
              strokeDasharray={`${percentage} ${100 - percentage}`}
              strokeLinecap="round"
            />
            <Text style={styles.percentage}>{`${Math.round(
              percentage
            )}%`}</Text>
          </Svg>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={(styles.button, { height: 30, width: 75 })}
              onPress={handlePresentPress}
              compact
            >
              Present
            </Button>
            {/* <Button
              mode="contained"
              style={(styles.button, { height: 30, width: 30 })}
              onPress={handleAbsentPress}
              compact
            >
              Absent
            </Button> */}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  subject: {
    fontSize: 20,
  },
  attendenceText: {
    fontSize: 16,
    marginRight: 5,
  },
  count: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-around",
  },
  card: {
    margin: 5,
    padding: 5,
  },
  attendence: {
    flexDirection: "row",
    alignContent: "center",
  },
  circle: {
    marginVertical: 20,
  },
  percentage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: 39 }],
    fontWeight: "bold",
    fontSize: 16,
  },
  graph: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    fontSize: 5,
  },
});

export default AttedenceCard;
