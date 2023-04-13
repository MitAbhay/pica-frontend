import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import {
  ActivityIndicator,
  Badge,
  Button,
  Card,
  Chip,
  DataTable,
  IconButton,
  MD2Colors,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Results() {
  const route = useRoute();
  const [studentData, setStudentData] = useState(null);
  const [semester, setSemester] = useState(1);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://nith-results-api.deta.dev/student/${
            route.params.roll == "" ? "20bcs013" : route.params.roll
          }`
        );
        const data = response.data;
        setStudentData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [selectedButton, setSelectedButton] = useState(1);
  const filters = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleButtonPress = (filterValue) => {
    setSelectedButton(filterValue);
    setSemester(filterValue);
  };

  return (
    <View>
      {studentData ? (
        <>
          <Card style={styles.card}>
            {/* <Text style={styles.subject}>{subject}</Text> */}
            <View style={{ margin: 15 }}>
              <View style={styles.count}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>CGPI</Text>
                <Text style={{ color: "green" }}>{studentData.cgpi}</Text>
              </View>
              <View style={styles.count}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Rank</Text>
                <Text style={{ color: "green" }}>{studentData.rank}</Text>
              </View>
              <View style={styles.count}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Branch Rank
                </Text>
                <Text style={{ color: "green" }}>
                  {studentData.branch_rank}
                </Text>
              </View>
              <View style={styles.count}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Batch Rank
                </Text>
                <Text style={{ color: "green" }}>{studentData.batch_rank}</Text>
              </View>
            </View>
          </Card>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {/* <Text>semester</Text> */}
            {filters.map((filterValue) => (
              <IconButton
                key={filterValue}
                size={15}
                onPress={() => handleButtonPress(filterValue)}
                mode={selectedButton === filterValue ? "contained" : "outlined"}
                icon={() => (
                  <Badge
                    size={30}
                    visible={true}
                    style={{ backgroundColor: null, color: "black" }}
                  >
                    {filterValue}
                  </Badge>
                )}
              />
            ))}
          </View>

          <ScrollView>
            <DataTable style={{ padding: 8 }}>
              <DataTable.Header>
                <DataTable.Title>SNo.</DataTable.Title>
                <DataTable.Title style={{ flex: 5 }}>Subject</DataTable.Title>
                <DataTable.Title>Grade</DataTable.Title>
              </DataTable.Header>
              {studentData.results[semester - 1]?.subjects.map(
                (subject, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{subject.sno}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 5 }}>
                      {subject.name}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1 }}>
                      {subject.grade}
                    </DataTable.Cell>
                  </DataTable.Row>
                )
              )}
            </DataTable>
          </ScrollView>
        </>
      ) : (
        <View style={{ marginTop: 250 }}>
          <ActivityIndicator
            size="large"
            animating={true}
            color={MD2Colors.yellow600}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    padding: 8,
    margin: 10,
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
