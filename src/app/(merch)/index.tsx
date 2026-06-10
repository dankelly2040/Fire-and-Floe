import { Text, View } from "react-native";

export default function MerchScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#F5F0EB", fontSize: 20, fontWeight: "700" }}>Merch</Text>
      <Text style={{ color: "#B8AFA6", fontSize: 15, marginTop: 8 }}>Coming soon</Text>
    </View>
  );
}
