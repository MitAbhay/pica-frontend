// Formik x React Native example

import React from "react";

import { TextInput, Button, RadioButton } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import { Field, Formik } from "formik";

const initialValues = {
  roll: "",
  name: "",
  gender: "",
  password: "",
};

export const Register = (props) => {
  const [checked, setChecked] = React.useState("male");

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
            <View>
              <View style={{ display: "flex" }}>
                u
                <RadioButton
                  value="male"
                  status={checked === "male" ? "checked" : "unchecked"}
                  onPress={() => setChecked("male")}
                />
                <Text>Male</Text>
              </View>
              <View>
                <RadioButton
                  value="female"
                  status={checked === "female" ? "checked" : "unchecked"}
                  onPress={() => setChecked("female")}
                />
                <Text>Female</Text>
              </View>
            </View>
            <TextInput
              style={styles.input}
              label="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button
              style={styles.button}
              icon="login"
              mode="contained"
              onPress={handleSubmit}
            >
              Register
            </Button>
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
