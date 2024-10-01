import React, { createContext, useState } from "react";
import { AppRegistry } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { name as appName } from "./app.json";
import App from "./src/App";

export const ThemeContext = createContext();

export default function Main() {
  const [theme, setTheme] = useState("light");

  const lightTheme = {
    colors: {
      primary: "rgb(0, 95, 175)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(212, 227, 255)",
      onPrimaryContainer: "rgb(0, 28, 58)",
      secondary: "rgb(84, 95, 113)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(216, 227, 248)",
      onSecondaryContainer: "rgb(17, 28, 43)",
      tertiary: "rgb(121, 89, 0)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(255, 223, 160)",
      onTertiaryContainer: "rgb(38, 26, 0)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(253, 252, 255)",
      onBackground: "rgb(26, 28, 30)",
      surface: "rgb(253, 252, 255)",
      onSurface: "rgb(26, 28, 30)",
      surfaceVariant: "rgb(224, 226, 236)",
      onSurfaceVariant: "rgb(67, 71, 78)",
      outline: "rgb(116, 119, 127)",
      outlineVariant: "rgb(195, 198, 207)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(47, 48, 51)",
      inverseOnSurface: "rgb(241, 240, 244)",
      inversePrimary: "rgb(165, 200, 255)",
      elevation: {
        level0: "transparent",
        level1: "rgb(240, 244, 251)",
        level2: "rgb(233, 239, 249)",
        level3: "rgb(225, 235, 246)",
        level4: "rgb(223, 233, 245)",
        level5: "rgb(218, 230, 244)",
      },
      surfaceDisabled: "rgba(26, 28, 30, 0.12)",
      onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
      backdrop: "rgba(45, 49, 56, 0.4)",
    },
  };
  const darkTheme = {
    colors: {
      primary: "rgb(165, 200, 255)",
      onPrimary: "rgb(0, 49, 95)",
      primaryContainer: "rgb(0, 71, 134)",
      onPrimaryContainer: "rgb(212, 227, 255)",
      secondary: "rgb(188, 199, 220)",
      onSecondary: "rgb(39, 49, 65)",
      secondaryContainer: "rgb(61, 71, 88)",
      onSecondaryContainer: "rgb(216, 227, 248)",
      tertiary: "rgb(248, 189, 42)",
      onTertiary: "rgb(64, 45, 0)",
      tertiaryContainer: "rgb(92, 67, 0)",
      onTertiaryContainer: "rgb(255, 223, 160)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(26, 28, 30)",
      onBackground: "rgb(227, 226, 230)",
      surface: "rgb(26, 28, 30)",
      onSurface: "rgb(227, 226, 230)",
      surfaceVariant: "rgb(67, 71, 78)",
      onSurfaceVariant: "rgb(195, 198, 207)",
      outline: "rgb(141, 145, 153)",
      outlineVariant: "rgb(67, 71, 78)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(227, 226, 230)",
      inverseOnSurface: "rgb(47, 48, 51)",
      inversePrimary: "rgb(0, 95, 175)",
      elevation: {
        level0: "transparent",
        level1: "rgb(33, 37, 41)",
        level2: "rgb(37, 42, 48)",
        level3: "rgb(41, 47, 55)",
        level4: "rgb(43, 49, 57)",
        level5: "rgb(46, 52, 62)",
      },
      surfaceDisabled: "rgba(227, 226, 230, 0.12)",
      onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
      backdrop: "rgba(45, 49, 56, 0.4)",
    },
  };

  const customTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PaperProvider theme={customTheme}>
        <App />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
