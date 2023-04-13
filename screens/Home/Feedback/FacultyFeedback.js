import React from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  RadioButton,
  Text,
} from "react-native-paper";
import { Formik } from "formik";

const initialValues = {
  cleanliness: "",
  facilities: "",
  staff: "",
  location: "",
  comment: "",
};

const measures = ["Cleanliness", "Facilities", "Staff", "Location", "Comment"];

const HOSTEL_ID = "123"; // Replace with your own hostel ID

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://example.com/api/feedback/${HOSTEL_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        setShowSnackbar(true);
        resetForm(initialValues);
      } else {
        alert(...values);
      }
    } catch (error) {
      console.log(values);
      alert(values);
    }
    setIsSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            {measures.map((item, index) => {
              return (
                <View key={index} style={styles.radioGroup}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <RadioButton
                      value="1"
                      status={
                        values[item.toLowerCase()] === "1"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => handleChange(item.toLowerCase())("1")}
                    />
                    <RadioButton
                      value="2"
                      status={
                        values[item.toLowerCase()] === "2"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => handleChange(item.toLowerCase())("2")}
                    />
                    <RadioButton
                      value="3"
                      status={
                        values[item.toLowerCase()] === "3"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => handleChange(item.toLowerCase())("3")}
                    />
                    <RadioButton
                      value="4"
                      status={
                        values[item.toLowerCase()] === "4"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => handleChange(item.toLowerCase())("4")}
                    />
                    <RadioButton
                      value="5"
                      status={
                        values[item.toLowerCase()] === "5"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => handleChange(item.toLowerCase())("5")}
                    />
                  </View>
                </View>
              );
            })}
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              Submit Feedback
            </Button>
          </View>
        )}
      </Formik>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
      >
        Feedback submitted successfully!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  input: {
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    marginTop: 16,
  },
});
