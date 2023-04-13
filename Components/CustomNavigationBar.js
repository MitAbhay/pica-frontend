import { useState } from "react";
import { Text, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

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
      <View
        style={{
          marginLeft: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
          >
            {currentDate}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
        >
          <Avatar.Image
            style={{}}
            size={24}
            source={require("../assets/mitabhay.jpeg")}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              marginLeft: 10,
            }}
          >
            Abhay Mittal
          </Text>
        </View>
      </View>
    </Appbar.Header>
  );
}
