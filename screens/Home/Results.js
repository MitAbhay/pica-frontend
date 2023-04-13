import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { DataTable } from "react-native-paper";

export default function StudentDetails({ rollNumber }) {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://nith-results-api.deta.dev/student/20bcs013`
        );
        const data = response.data;
        setStudentData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [rollNumber]);

  const Data = [
    { name: "John", age: 20, address: "123 Main St" },
    { name: "Mary", age: 21, address: "456 Elm St" },
    { name: "Bob", age: 22, address: "789 Oak St" },
  ];

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Age</DataTable.Title>
          <DataTable.Title>Address</DataTable.Title>
        </DataTable.Header>

        {Data.map((student, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{student.name}</DataTable.Cell>
            <DataTable.Cell>{student.age}</DataTable.Cell>
            <DataTable.Cell>{student.address}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      {studentData ? (
        <>
          <Text>Name: {studentData.name}</Text>
          <Text>Roll Number: {studentData.roll}</Text>
          <Text>Department: {studentData.department}</Text>
          <Text>CGPA: {studentData.cgpi}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
