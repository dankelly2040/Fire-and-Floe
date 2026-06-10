import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const CARD_BG = "#2A2A2A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    type: string;
    date: string;
    time: string;
    seats: string;
    price: string;
  }>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const price = Number(params.price) || 0;
  const seats = Number(params.seats) || 1;
  const isPrivate = params.type === "buyout";

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (confirmed) {
    return (
      <View style={{ flex: 1, backgroundColor: BG, justifyContent: "center", alignItems: "center", padding: 40 }}>
        <Text style={{ fontSize: 64, color: "#4CAF50", marginBottom: 16 }}>✓</Text>
        <Text style={{ fontSize: 28, fontWeight: "800", color: TEXT_PRIMARY, marginBottom: 16 }}>
          Booking Confirmed!
        </Text>
        <Text style={{ fontSize: 16, color: TEXT_SECONDARY, textAlign: "center", lineHeight: 24 }}>
          {isPrivate ? "Private Buyout" : `${seats} Seat${seats > 1 ? "s" : ""}`}
          {"\n"}
          {formatDate(params.date ?? "")}
          {"\n"}
          {params.time}
        </Text>
        <Text style={{ fontSize: 14, color: ACCENT, marginTop: 20, textAlign: "center" }}>
          A confirmation has been sent to {email}
        </Text>
        <Pressable
          onPress={() => router.replace("/")}
          style={{
            backgroundColor: ACCENT,
            paddingHorizontal: 40,
            paddingVertical: 14,
            borderRadius: 10,
            borderCurve: "continuous",
            marginTop: 32,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: BG }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={{ paddingHorizontal: 20, gap: 24, marginTop: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: TEXT_PRIMARY }}>
          Checkout
        </Text>

        {/* Order summary */}
        <View
          style={{
            backgroundColor: CARD_BG,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT_PRIMARY }}>
            {isPrivate ? "Private Buyout" : "Community Session"}
          </Text>
          <Text style={{ fontSize: 14, color: TEXT_SECONDARY }}>
            {formatDate(params.date ?? "")}
          </Text>
          <Text style={{ fontSize: 14, color: TEXT_SECONDARY }}>
            Time: {params.time}
          </Text>
          {!isPrivate && (
            <Text style={{ fontSize: 14, color: TEXT_SECONDARY }}>
              Seats: {seats} x $32.00
            </Text>
          )}
          <View style={{ height: 1, backgroundColor: "#3A3A3A", marginVertical: 10 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: TEXT_PRIMARY }}>Total</Text>
            <Text style={{ fontSize: 22, fontWeight: "800", color: ACCENT }}>
              ${price.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={{ gap: 12 }}>
          <Text style={{ color: TEXT_PRIMARY, fontSize: 16, fontWeight: "700" }}>
            Contact information
          </Text>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: "#333",
              color: TEXT_PRIMARY,
              borderRadius: 10,
              borderCurve: "continuous",
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#3A3A3A",
            }}
          />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: "#333",
              color: TEXT_PRIMARY,
              borderRadius: 10,
              borderCurve: "continuous",
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#3A3A3A",
            }}
          />
        </View>

        {/* Promo */}
        <View style={{ gap: 12 }}>
          <Text style={{ color: TEXT_PRIMARY, fontSize: 16, fontWeight: "700" }}>
            Promo code or punch pass
          </Text>
          <TextInput
            placeholder="Enter code (optional)"
            placeholderTextColor="#666"
            value={promoCode}
            onChangeText={setPromoCode}
            autoCapitalize="characters"
            style={{
              backgroundColor: "#333",
              color: TEXT_PRIMARY,
              borderRadius: 10,
              borderCurve: "continuous",
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              borderWidth: 1,
              borderColor: "#3A3A3A",
            }}
          />
        </View>

        {/* Pay button */}
        <Pressable
          onPress={() => setConfirmed(true)}
          disabled={!name || !email}
          style={{
            backgroundColor: ACCENT,
            paddingVertical: 16,
            borderRadius: 12,
            borderCurve: "continuous",
            alignItems: "center",
            opacity: !name || !email ? 0.5 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
            Pay ${price.toFixed(2)}
          </Text>
        </Pressable>

        <Text
          style={{
            color: TEXT_SECONDARY,
            fontSize: 12,
            textAlign: "center",
            lineHeight: 18,
            paddingHorizontal: 10,
          }}
        >
          By completing this booking you agree to Fire + Floe's cancellation
          policy. Full refund up to 24 hours before your session.
        </Text>
      </View>
    </ScrollView>
  );
}
