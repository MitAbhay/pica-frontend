// Formik x React Native example

import React, { useState } from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { Formik } from "formik";
import { Link } from "@react-navigation/native";

const initialValues = {
  roll: "",
  password: "",
};

const image = {
  uri: "https://preview.redd.it/h9lg8cblz6y01.png?auto=webp&s=e46c6a7a5762084c7802c6b9c107b5ab730991b7",
};

export default function Login({ navigation }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onSubmit = (values) => {
    console.log(JSON.stringify(values));
    fetch("https://pica.onrender.com/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.id) {
          navigation.navigate("Home", {
            roll: data.roll,
            username: data.username,
          });
        } else {
          setShowSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <ImageBackground source={image} blurRadius={1.5} style={styles.background}>
      <View style={styles.form}>
        {/* <Text className="text-7xl text-center text-red-400">PICA</Text> */}
        <Snackbar
          style={{ marginBottom: 310, marginLeft: 10 }}
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          duration={3000}
        >
          Invalid username or password
        </Snackbar>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                label="Roll Number"
                onChangeText={handleChange("roll")}
                onBlur={handleBlur("roll")}
                value={values.roll}
              />
              <TextInput
                style={styles.input}
                label="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                right={<TextInput.Icon icon="eye" />}
              />
              <Button
                style={styles.button}
                icon="login"
                mode="contained"
                onPress={() => {
                  handleSubmit();
                  // navigation.push("Home");
                }}
              >
                Log In
              </Button>
            </View>
          )}
        </Formik>
        <View style={{ marginHorizontal: 80 }}>
          <Link to={{ screen: "Register" }}>
            <Text style={{ color: "white" }}>
              Don't have account? Create now !!
            </Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  form: {
    marginVertical: 190,
  },
  container: {
    margin: 40,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 40,
  },
  button: {
    marginTop: 40,
    padding: 5,
  },
});
