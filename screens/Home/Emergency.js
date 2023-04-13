import React, { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import axios from "axios";
import * as cheerio from "cheerio";

export default function Results({ roll }) {
  // const [resultData, setResultData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get(
  //       `https://nith-results.netlify.app/student.html?roll=20bcs013`
  //     );
  //     console.log(result.data);
  //     const $ = cheerio.load(result.data);
  //     console.log($());
  //     const data = $("table tr:nth-child(2) td:nth-child(2)").text();
  //     setResultData(data);
  //   };
  //   fetchData();
  // }, [roll]);

  return <Text>jaj</Text>;
}
