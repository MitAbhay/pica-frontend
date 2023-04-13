// import Home from "../screens/Home/Home";
// import React from "react";
// import { Text, View } from "react-native";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();

// export const ProfileDrawer = () => {
//   return (
//     <Drawer.Navigator drawerContent={() => <DrawerContent />}>
//       <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
//   );
// };

import * as React from "react";
import { Drawer } from "react-native-paper";

const DrawerHome = () => {
  const [active, setActive] = React.useState("");

  return (
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === "first"}
        onPress={() => setActive("first")}
      />
      <Drawer.Item
        label="Second Item"
        active={active === "second"}
        onPress={() => setActive("second")}
      />
    </Drawer.Section>
  );
};

export default DrawerHome;
