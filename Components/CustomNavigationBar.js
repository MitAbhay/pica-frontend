import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

export default function CustomNavigationBar(props) {
  const route = useRoute();
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
            source={require("../assets/favicon.png")}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              marginLeft: 10,
            }}
          >
            {route.params.username == "" ? "MitAbhay" : route.params.username}
          </Text>
        </View>
      </View>
    </Appbar.Header>
  );
}
