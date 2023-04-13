// Formik x React Native example

import React, { useState } from "react";

import { TextInput, Button, RadioButton, Snackbar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import { Field, Formik } from "formik";
import { Link } from "@react-navigation/native";

const initialValues = {
  roll: "",
  username: "",
  password: "",
};

export const Register = ({ navigation }) => {
  const [gender, setGender] = React.useState("male");
  const [showSnackbar1, setShowSnackbar1] = useState(false);
  const [showSnackbar2, setShowSnackbar2] = useState(false);

  const onSubmit = (values) => {
    console.log(JSON.stringify(values));
    fetch("https://pica.onrender.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.message === "User registered successfully!") {
          navigation.navigate("Login");
        }
        if (data.message === "Failed! Username is already in use!") {
          setShowSnackbar2(true);
        }
        if (data.message === "Failed! Roll Number is already in use!") {
          setShowSnackbar2(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Snackbar
        style={{ marginBottom: 380, marginLeft: 10 }}
        visible={showSnackbar1}
        onDismiss={() => setShowSnackbar1(false)}
        duration={3000}
      >
        Fill all details
      </Snackbar>
      <Snackbar
        style={{ marginBottom: 600, marginLeft: 10 }}
        visible={showSnackbar2}
        onDismiss={() => setShowSnackbar2(false)}
        duration={3000}
      >
        Username or Roll Number is already in use
      </Snackbar>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              label="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <TextInput
              style={styles.input}
              label="Roll Number"
              onChangeText={handleChange("roll")}
              onBlur={handleBlur("roll")}
              value={values.roll}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="male"
                  status={gender === "male" ? "checked" : "unchecked"}
                  onPress={() => setGender("male")}
                />
                <Text>Male</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="female"
                  status={gender === "female" ? "checked" : "unchecked"}
                  onPress={() => setGender("female")}
                />
                <Text>Female</Text>
              </View>
            </View>
            <TextInput
              style={styles.input}
              label="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              right={<TextInput.Icon icon="eye" />}
            />
            <TextInput
              style={styles.input}
              label="Confirm Password"
              secureTextEntry
              onChangeText={handleChange("cpassword")}
              onBlur={handleBlur("cpassword")}
              value={values.password}
              right={<TextInput.Icon icon="eye" />}
            />
            <Button
              style={styles.button}
              icon="login"
              mode="contained"
              onPress={() => handleSubmit(values, gender)}
            >
              Register
            </Button>
            <View style={{ marginVertical: 40, marginLeft: 60 }}>
              <Link to={{ screen: "Login" }}>
                <Text style={{ color: "black" }}>
                  Already have account? Log In !!
                </Text>
              </Link>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  form: {
    marginVertical: 20,
  },
  container: {
    margin: 20,
    marginTop: 130,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 20,
  },
  button: {
    marginTop: 40,
    padding: 5,
  },
});
