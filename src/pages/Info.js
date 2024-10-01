import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Text } from "react-native-paper";

export default function Info() {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Info</Text>
      <Text variant="bodyLarge" style={{ marginTop: 20 }}>
        Set your goals and dreams with their upcoming dates
      </Text>
      <Text variant="bodyLarge" style={{ marginTop: 8 }}>
        and see them countdown in real time
      </Text>
      <Text variant="bodyLarge" style={{ marginTop: 8 }}>
        The progress bar shows how much time has passed
      </Text>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => openLink("https://github.com/Maxhu787/count-down-timer")}
      >
        <Text variant="bodyLarge" style={{ marginTop: 10, color: "blue" }}>
          https://github.com/Maxhu787/count-down-timer
        </Text>
      </TouchableOpacity>
      <Text>Github repo</Text>
      <TouchableOpacity onPress={() => openLink("https://github.com/Maxhu787")}>
        <Text variant="bodyLarge" style={{ marginTop: 10, color: "blue" }}>
          https://github.com/Maxhu787
        </Text>
      </TouchableOpacity>
      <Text>My Github</Text>
      <TouchableOpacity
        style={{ marginTop: 4 }}
        onPress={() => openLink("https://hackmd.io/@winsonOTP/codedream")}
      >
        <Text variant="bodyLarge" style={{ marginTop: 10, color: "blue" }}>
          https://hackmd.io/@winsonOTP/codedream
        </Text>
      </TouchableOpacity>
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
    color: "#fff",
    paddingTop: 50,
    paddingHorizontal: 40,
    height: "100%",
  },
});
