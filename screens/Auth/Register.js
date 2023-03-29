// Formik x React Native example

import React from "react";

import { TextInput, Button, RadioButton } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import { Field, Formik } from "formik";
import { Link } from "@react-navigation/native";

const initialValues = {
  roll: "",
  name: "",
  password: "",
};

export const Register = (props) => {
  const [gender, setGender] = React.useState("male");

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              label="Full Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
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
              <Link to={{ screen: "Register" }}>
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
