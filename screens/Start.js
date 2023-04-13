import React, { useEffect } from "react";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { View } from "react-native";

export default function Start({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2000); // Change the duration here (in milliseconds)
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ marginTop: 300 }}>
      <Text
        variant="displayLarge"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        PICA
      </Text>
      <ActivityIndicator
        size="large"
        animating={true}
        color={MD2Colors.yellow600}
      />
    </View>
  );
}
