import React, { useState, useEffect } from "react";
import { Card, DataTable, Text } from "react-native-paper";
import axios from "axios";
import * as cheerio from "cheerio";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const emergencyData = [
  { designation: "Director", number: "222308, 254001" },
  { designation: "Assistant SG-II(PA) ", number: "254001, 222308" },
  { designation: "Sr. Office Attendant SG-II ", number: "254001, 222308 " },
  { designation: "Registrar (I/c) ", number: "254010, 224390" },
  {
    designation: "Stenographer SG-II, PA",
    number: "254011,224390,222584(Fax No) ",
  },
  { designation: "Sr. Office Attendant ", number: "254011" },
  { designation: "Dean", number: "254005" },
  { designation: "Associate Dean", number: "254314 " },
];

const importantData = [
  { office: "Fire Station", number: "01972-223033 " },
  { office: "Regional Hospital, Hamirpur ", number: "01972-222222 " },
  { office: "Bus Stand Hamirpur ", number: "01972-222893 " },
  { office: "Police Station ", number: "01972-224306 " },
  { office: "Railway Station (UNA) ", number: "01975-223522 " },
  { office: "Airport (Gaggal) Kangra ", number: "01892-232374 " },
  { office: "Taxi", number: "9459117986" },
];
export default function Emergency({ roll }) {
  return (
    <ScrollView>
      <Card style={styles.card}>
        {/* <Text style={styles.subject}>{subject}</Text> */}
        <DataTable style={{ padding: 8 }}>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 2 }}>Office</DataTable.Title>
            <DataTable.Title>Office Number</DataTable.Title>
          </DataTable.Header>
          {importantData.map((i, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{ flex: 2 }}>{i.office}</DataTable.Cell>
              <DataTable.Cell>{i.number}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card>
      <Card style={styles.card}>
        {/* <Text style={styles.subject}>{subject}</Text> */}
        <DataTable style={{ padding: 8 }}>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 2 }}>Designation</DataTable.Title>
            <DataTable.Title>Office Number</DataTable.Title>
          </DataTable.Header>
          {emergencyData.map((e, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{ flex: 2 }}>
                {e.designation}
              </DataTable.Cell>
              <DataTable.Cell>{e.number}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    padding: 8,
    margin: 10,
  },
  count: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
});
