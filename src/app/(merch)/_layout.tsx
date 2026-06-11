import { Stack } from "expo-router/stack";

export default function MerchLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="product" />
    </Stack>
  );
}
