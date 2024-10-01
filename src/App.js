import * as React from "react";
import { View } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import Home from "./pages/Home";
import New from "./pages/New";
import Finished from "./pages/Finished";
import Settings from "./pages/Settings";
import Info from "./pages/Info";

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
    },
    {
      key: "new",
      title: "New",
      focusedIcon: "bookmark-plus",
      unfocusedIcon: "bookmark-plus-outline",
    },
    {
      key: "finished",
      title: "Finished",
      focusedIcon: "bookmark-check",
      unfocusedIcon: "bookmark-check-outline",
    },
    {
      key: "settings",
      title: "settings",
      focusedIcon: "account-settings",
      unfocusedIcon: "account-settings-outline",
    },
    {
      key: "info",
      title: "Info",
      focusedIcon: "information",
      unfocusedIcon: "information-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    new: New,
    finished: Finished,
    settings: Settings,
    info: Info,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      theme={{ colors: { secondaryContainer: "rgb(0, 128, 255)" } }}
    />
  );
};

export default MyComponent;
