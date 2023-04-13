import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, Text } from "react-native-paper";

export default function AttendanceDetails(props) {
  const {
    subject,
    presentDates,
    absentDates,
    presentCount,
    absentCount,
    totalClasses,
  } = props.route.params;
  console.log(presentDates, absentDates);
  const markedDates = {};
  presentDates?.forEach((date) => {
    markedDates[date] = { marked: true, dotColor: "green" };
  });
  absentDates?.forEach((date) => {
    markedDates[date] = { marked: true, dotColor: "red" };
  });

  return (
    <>
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        markedDates={markedDates}
        theme={{
          backgroundColor: "#fff",
          calendarBackground: "#fff",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#fcb900",
          selectedDayTextColor: "#fff",
          todayTextColor: "#fcb900",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#fcb900",
          selectedDotColor: "#fff",
          arrowColor: "#fcb900",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "#fcb900",
          indicatorColor: "#fcb900",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
      <Card style={styles.card}>
        <Text style={styles.subject}>{subject}</Text>
        <View style={{ margin: 15 }}>
          <View style={styles.count}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Total Present Count
            </Text>
            <Text style={{ color: "green" }}>{presentCount}</Text>
          </View>
          <View style={styles.count}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Total Absent Count
            </Text>
            <Text style={{ color: "red" }}>{absentCount}</Text>
          </View>
        </View>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    padding: 6,
    margin: 3,
  },
  subject: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 6,
    borderLeftColor: "red",
    borderLeftWidth: 2,
  },
  count: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
});
