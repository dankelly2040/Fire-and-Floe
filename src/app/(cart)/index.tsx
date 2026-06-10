import { Text, View } from "react-native";

export default function CartScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1A1A1A", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#F5F0EB", fontSize: 20, fontWeight: "700" }}>Cart</Text>
      <Text style={{ color: "#B8AFA6", fontSize: 15, marginTop: 8 }}>Your cart is empty</Text>
    </View>
  );
}
