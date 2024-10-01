import { StyleSheet, View, Alert, StatusBar } from "react-native";
import React, { useRef, useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function New() {
  const temp = new Date();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(temp.getFullYear().toString());
  const [month, setMonth] = useState((temp.getMonth() + 1).toString());
  const [day, setDay] = useState(temp.getDate().toString());
  const [hour, setHour] = useState(temp.getHours().toString());
  const [minute, setMinute] = useState(temp.getMinutes().toString());
  const [second, setSecond] = useState(temp.getSeconds().toString());
  const [note, setNote] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({
    title: false,
    endDate: false,
    note: false,
  });

  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  const formatDate = () => {
    return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
  };

  const validateStep = () => {
    let validationErrors = {
      title: !title || title.length > 36,
      endDate: !year || !month || !day || !hour || !minute || !second,
      note: note.length > 24,
    };

    const yearInt = parseInt(year);
    const monthInt = parseInt(month);
    const dayInt = parseInt(day);
    const hourInt = parseInt(hour);
    const minuteInt = parseInt(minute);
    const secondInt = parseInt(second);

    if (monthInt < 1 || monthInt > 12) {
      validationErrors.endDate = true;
    }
    const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
    if (dayInt < 1 || dayInt > daysInMonth) {
      validationErrors.endDate = true;
    }
    if (hourInt < 0 || hourInt > 23) {
      validationErrors.endDate = true;
    }
    if (minuteInt < 0 || minuteInt > 59 || secondInt < 0 || secondInt > 59) {
      validationErrors.endDate = true;
    }

    setErrors(validationErrors);
    return !Object.values(validationErrors).includes(true);
  };

  const handleChange = (field, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    switch (field) {
      case "title":
        setTitle(value);
        if (value.length > 0 && value.length <= 36) {
          setErrors((prevErrors) => ({ ...prevErrors, title: false }));
        }
        break;
      case "year":
        setYear(numericValue);
        break;
      case "month":
        setMonth(numericValue);
        break;
      case "day":
        setDay(numericValue);
        break;
      case "hour":
        setHour(numericValue);
        break;
      case "minute":
        setMinute(numericValue);
        break;
      case "second":
        setSecond(numericValue);
        break;
      case "note":
        setNote(value);
        if (value.length <= 24) {
          setErrors((prevErrors) => ({ ...prevErrors, note: false }));
        }
        break;
      default:
        break;
    }
  };
  const getGoals = async () => {
    const jsonValue = await AsyncStorage.getItem("@goals");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  };

  const appendAndStoreGoal = async (newGoal) => {
    try {
      const existingGoals = await getGoals();

      let updatedGoals = [...existingGoals, newGoal];

      updatedGoals = JSON.stringify(updatedGoals);
      await AsyncStorage.setItem("@goals", updatedGoals);
      console.log("Goals saved successfully!");
    } catch (e) {
      console.error("Failed to add goal.", e);
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const temp = {
        title: title,
        endDate: new Date(formatDate()),
        startDate: new Date(),
        note: note,
      };
      appendAndStoreGoal(temp);

      const tempDate = new Date();
      setTitle("");
      setYear(tempDate.getFullYear().toString());
      setMonth((tempDate.getMonth() + 1).toString());
      setDay(tempDate.getDate().toString());
      setHour(tempDate.getHours().toString());
      setMinute(tempDate.getMinutes().toString());
      setSecond(tempDate.getSeconds().toString());
      setNote("");

      Alert.alert("Goal Added!", JSON.stringify(temp), [
        {
          text: "ok",
          onPress: () => setActiveStep(0),
        },
      ]);
    } else {
      Alert.alert("Error", "Please fill all fields correctly.");
    }
  };

  const progressStepsStyle = {
    activeStepIconBorderColor: "rgb(0, 128, 255)",
    activeLabelColor: "rgb(0, 128, 255)",
    activeStepNumColor: "white",
    activeStepIconColor: "rgb(0, 128, 255)",
    completedStepIconColor: "rgb(0, 128, 255)",
    completedProgressBarColor: "rgb(0, 128, 255)",
    completedCheckColor: "#11ff00",
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <ProgressSteps activeStep={activeStep} {...progressStepsStyle}>
        <ProgressStep
          label="Title"
          onNext={validateStep}
          errors={errors.title}
          nextBtnTextStyle={styles.buttonStyle}
        >
          <View style={styles.stepContainer}>
            <Text variant="titleLarge" style={styles.text}>
              Title
            </Text>
            <TextInput
              style={styles.textinput}
              label="Title"
              mode={"outlined"}
              value={title}
              onChangeText={(text) => handleChange("title", text)}
              error={errors.title}
            />
            {errors.title && (
              <Text style={styles.errorText}>
                {title.length > 36
                  ? "Title must be 36 characters or less."
                  : "Title is required."}
              </Text>
            )}
          </View>
        </ProgressStep>

        <ProgressStep
          label="End Date"
          onNext={validateStep}
          errors={errors.endDate}
          nextBtnTextStyle={styles.buttonStyle}
          previousBtnTextStyle={styles.buttonStyle}
        >
          <View style={styles.stepContainer}>
            <Text variant="titleLarge" style={styles.text}>
              End Date
            </Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                label="Year"
                value={year}
                keyboardType="numeric"
                onChangeText={(text) => handleChange("year", text)}
                returnKeyType="next"
                onSubmitEditing={() => monthRef.current.focus()}
              />
              <TextInput
                ref={monthRef}
                style={styles.dateInput}
                label="Month"
                value={month}
                keyboardType="numeric"
                onChangeText={(text) => handleChange("month", text)}
                returnKeyType="next"
                onSubmitEditing={() => dayRef.current.focus()}
              />
              <TextInput
                ref={dayRef}
                style={styles.dateInput}
                label="Day"
                value={day}
                keyboardType="numeric"
                onChangeText={(text) => handleChange("day", text)}
                returnKeyType="next"
                onSubmitEditing={() => hourRef.current.focus()}
              />
              <TextInput
                ref={hourRef}
                style={styles.dateInput}
                label="Hour"
                value={hour}
                keyboardType="numeric"
                onChangeText={(text) => handleChange("hour", text)}
                returnKeyType="next"
                onSubmitEditing={() => minuteRef.current.focus()}
              />
              <TextInput
                ref={minuteRef}
                style={styles.dateInput}
                label="Minute"
                value={minute}
                keyboardType="numeric"
                onChangeText={(text) => handleChange("minute", text)}
                returnKeyType="next"
                onSubmitEditing={() => secondRef.current.focus()}
              />
              <TextInput
                ref={secondRef}
                style={styles.dateInput}
                label="Second"
                value={second}
                keyboardType="numeric"
                onChangeText={(text) => handleChange("second", text)}
                returnKeyType="done"
              />
            </View>
            {errors.endDate && (
              <Text style={styles.errorText}>
                Make sure fields are filled with the right value.
              </Text>
            )}
          </View>
        </ProgressStep>

        <ProgressStep
          label="Note"
          onNext={validateStep}
          errors={errors.note}
          finishBtnText="Submit"
          onSubmit={handleSubmit}
          nextBtnTextStyle={styles.buttonStyle}
          previousBtnTextStyle={styles.buttonStyle}
        >
          <View style={styles.stepContainer}>
            <Text variant="titleLarge" style={styles.text}>
              Short Note
            </Text>
            <TextInput
              style={styles.textinput}
              label="Short Note"
              value={note}
              onChangeText={(text) => handleChange("note", text)}
              error={errors.note}
            />
            {errors.note && (
              <Text style={styles.errorText}>
                {note.length > 24 ? "Note must be 24 characters or less." : ""}
              </Text>
            )}
          </View>
        </ProgressStep>
      </ProgressSteps>
      <StatusBar
        animated={true}
        backgroundColor={"rgb(0, 128, 255)"}
        barStyle="dark-content"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  text: {
    paddingVertical: 18,
    width: "100%",
  },
  textinput: {
    width: "100%",
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  dateInput: {
    width: "30%",
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: "rgb(0, 128, 255)",
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  errorText: {
    color: "#bc1c1c",
    marginTop: 5,
    fontSize: 16,
    width: "100%",
  },
});
