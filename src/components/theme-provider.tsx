import {
  DarkTheme,
  ThemeProvider as RNTheme,
} from "expo-router/react-navigation";

const FireFloeTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#1A1A1A",
    card: "#1A1A1A",
    border: "#2A2A2A",
  },
};

export function ThemeProvider(props: { children: React.ReactNode }) {
  return (
    <RNTheme value={FireFloeTheme}>
      {props.children}
    </RNTheme>
  );
}
