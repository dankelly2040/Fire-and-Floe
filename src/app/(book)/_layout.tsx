import { Stack } from "expo-router/stack";

export default function BookLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="book" />
      <Stack.Screen name="checkout" />
    </Stack>
  );
}
