import { useState } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function CustomNavigationBar(props) {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  return (
    <Appbar.Header>
      <View style={{ marginLeft: 50, flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
          {currentDate}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            marginLeft: 20,
          }}
        >
          Abhay Mittal
        </Text>
      </View>
    </Appbar.Header>
  );
}
