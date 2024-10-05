import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import { Text, ProgressBar, Icon } from "react-native-paper";
import { ThemeContext } from "../../App";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "../components/GradientText";

const Card = ({ goal, timeLeft, progress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const formatTimeUnit = (value) => {
    return String(value || 0).padStart(2, "0");
  };

  return (
    <LinearGradient
      colors={["rgb(0, 128, 255) ", "red"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: 22,
        width: "85%",
        marginTop: 18,
      }}
    >
      <View
        style={{
          // backgroundColor: "rgb(0, 128, 255)",
          backgroundColor: "rgba(52, 52, 52, 0)",
          paddingVertical: 25,
          paddingHorizontal: 25,
          borderRadius: 22,
        }}
      >
        <Text variant="headlineLarge" style={{ color: "#fff" }}>
          {goal.title}
        </Text>
        <Text variant="titleMedium" style={styles.text}>
          {formatDate(goal.startDate)}~{formatDate(goal.endDate)}
        </Text>
        <Text variant="displayLarge" style={{ marginTop: 0, color: "#fff" }}>
          {timeLeft.days || 0} days
        </Text>

        <Text variant="titleLarge" style={styles.text}>
          {formatTimeUnit(timeLeft.hours)}h {formatTimeUnit(timeLeft.minutes)}m{" "}
          {formatTimeUnit(timeLeft.seconds)}s
        </Text>
        <Text
          variant="titleSmall"
          style={{
            ...styles.text,
            position: "absolute",
            right: 25,
            bottom: 40,
          }}
        >
          {goal.note}
        </Text>

        <ProgressBar
          progress={progress}
          color={"rgb(86, 171, 255)"}
          style={{ marginTop: 12 }}
        />
      </View>
    </LinearGradient>
  );
};

export default function Home() {
  const [timeLeftArray, setTimeLeftArray] = useState([]);
  const [progressArray, setProgressArray] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [goals, setGoals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const getGoals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@goals");
      // const jsonValueTemp = [
      //   {
      //     title: "Read 50 Books",
      //     endDate: "2024-12-31T23:59:00Z",
      //     startDate: "2023-10-01T00:00:00Z",
      //     note: "Currently at 35 books.",
      //   },
      //   {
      //     title: "Save $10,000",
      //     endDate: "2024-12-08T00:00:00Z",
      //     startDate: "2023-02-01T00:00:00Z",
      //     note: "For a big trip abroad.",
      //   },
      //   {
      //     title: "Learn French",
      //     endDate: "2024-08-01T12:00:00Z",
      //     startDate: "2023-10-01T00:00:00Z",
      //     note: "Practice speaking daily.",
      //   },
      //   {
      //     title: "Publish a Novel",
      //     endDate: "2025-03-01T17:00:00Z",
      //     startDate: "2023-10-01T00:00:00Z",
      //     note: "Final draft due next month.",
      //   },
      // ];

      return jsonValue != null ? JSON.parse(jsonValue) : [];
      return jsonValueTemp;
    } catch (e) {
      console.error("Failed to load goals.", e);
      return [];
    }
  };

  const loadGoals = async () => {
    setRefreshing(true);
    const storedGoals = await getGoals();
    setGoals(storedGoals);
    setRefreshing(false);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    const calculateAll = () => {
      const newTimeLeftArray = goals.map((goal) =>
        calculateTimeLeft(goal.endDate)
      );
      const newProgressArray = goals.map((goal) =>
        calculateProgress(goal.startDate, goal.endDate)
      );
      setTimeLeftArray(newTimeLeftArray);
      setProgressArray(newProgressArray);
    };

    if (goals.length > 0) {
      calculateAll();
    }
  }, [goals]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeftArray = goals.map((goal) =>
        calculateTimeLeft(goal.endDate)
      );
      const newProgressArray = goals.map((goal) =>
        calculateProgress(goal.startDate, goal.endDate)
      );
      setTimeLeftArray(newTimeLeftArray);
      setProgressArray(newProgressArray);
      setCurrentDate(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, [goals]);

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const targetDate = new Date(endDate);
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const calculateProgress = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now >= end) return 1;
    if (now <= start) return 0;

    const totalDuration = end - start;
    const elapsedDuration = now - start;

    return elapsedDuration / totalDuration;
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 50, paddingHorizontal: 40, width: "100%" }}>
        <Text variant="displayLarge">Hi</Text>
      </View>
      <View
        style={{ width: "100%", paddingHorizontal: 40, paddingVertical: 8 }}
      >
        <Text variant="headlineSmall">Your ongoing dreams</Text>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        decelerationRate={"fast"}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadGoals}
            colors={["rgb(0, 128, 255)"]}
            progressBackgroundColor={
              theme === "light" ? "#fff" : "rgb(41, 41, 41)"
            }
          />
        }
      >
        {goals.length === 0 ? (
          <View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>Click on the </Text>
              <Icon source="bookmark-plus-outline" size={30} />
              <Text style={{ fontSize: 20 }}> below to add one</Text>
            </View>
            <Text style={{ fontSize: 20 }}> or swipe down to refresh</Text>
          </View>
        ) : (
          goals.map((goal, index) => {
            const timeLeft = timeLeftArray[index] || {};
            const isZeroTimeLeft =
              (timeLeft.days || 0) === 0 &&
              (timeLeft.hours || 0) === 0 &&
              (timeLeft.minutes || 0) === 0 &&
              (timeLeft.seconds || 0) === 0;

            return !isZeroTimeLeft ? (
              <Card
                key={index}
                goal={goal}
                timeLeft={timeLeft}
                progress={progressArray[index] || 0}
              />
            ) : null;
          })
        )}
      </ScrollView>
      <Text variant="labelMedium" style={{ marginBottom: 8, marginTop: 8 }}>
        {currentDate}
      </Text>
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
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
