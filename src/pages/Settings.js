import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Text, Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../App";

export default function Settings() {
  const handleDelete = async () => {
    await AsyncStorage.removeItem("@goals");
    Alert.alert("Action", "Deleted successfully");
  };
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setTheme(theme === "light" ? "dark" : "light");
  };

  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text variant="displayLarge">Settings</Text>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <Text
          variant="titleMedium"
          style={{
            textAlignVertical: "center",
            height: "100%",
            marginRight: 20,
          }}
        >
          Delete all goals
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Text variant="titleMedium" style={styles.delete}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            textAlignVertical: "center",
            height: "100%",
            marginRight: 10,
          }}
          variant="titleMedium"
        >
          Dark Mode
        </Text>
        <Switch
          color="rgb(0, 128, 255)"
          value={isSwitchOn}
          style={{ height: "100%" }}
          onValueChange={onToggleSwitch}
        />
      </View>
      <StatusBar
        animated={true}
        backgroundColor={"rgb(0, 128, 255)"}
        barStyle="dark-content"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    color: "#fff",

    // backgroundColor: "red",
    width: "100%",
    paddingTop: 50,
    paddingHorizontal: 40,
    height: "100%",
  },
  text: {
    color: "#fff",
  },
  delete: {
    width: 100,
    borderRadius: 12,
    padding: 12,
    marginTop: 2,
    color: "#fff",
    backgroundColor: "rgb(0, 128, 255)",
  },
});
