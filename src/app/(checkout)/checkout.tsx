import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const CARD_BG = "#2A2A2A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";
const INPUT_BG = "#333";

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setConfirmed(true);
  };

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
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.confirmWrap}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.confirmTitle}>Booking Confirmed!</Text>
          <Text style={styles.confirmText}>
            {isPrivate ? "Private Buyout" : `${seats} Seat${seats > 1 ? "s" : ""}`}
            {"\n"}
            {formatDate(params.date ?? "")}{"\n"}
            {params.time}
          </Text>
          <Text style={styles.confirmEmail}>
            A confirmation has been sent to {email}
          </Text>
          <Pressable
            style={styles.doneBtn}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.doneBtnText}>Done</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.orderCard}>
        <Text style={styles.orderTitle}>
          {isPrivate ? "Private Buyout" : "Community Session"}
        </Text>
        <Text style={styles.orderDetail}>
          {formatDate(params.date ?? "")}
        </Text>
        <Text style={styles.orderDetail}>Time: {params.time}</Text>
        {!isPrivate && (
          <Text style={styles.orderDetail}>
            Seats: {seats} x $32.00
          </Text>
        )}
        <View style={styles.orderDivider} />
        <View style={styles.orderTotal}>
          <Text style={styles.orderTotalLabel}>Total</Text>
          <Text style={styles.orderTotalPrice}>${price.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Promo Code or Punch Pass</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter code (optional)"
          placeholderTextColor="#666"
          value={promoCode}
          onChangeText={setPromoCode}
          autoCapitalize="characters"
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      <Pressable
        style={[
          styles.payBtn,
          (!name || !email) && styles.payBtnDisabled,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.payBtnText}>Pay ${price.toFixed(2)}</Text>
      </Pressable>

      <Text style={styles.disclaimer}>
        By completing this booking you agree to Fire + Floe's cancellation
        policy. Full refund up to 24 hours before your session.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: TEXT_PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  orderCard: {
    backgroundColor: CARD_BG,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
  },
  orderTitle: { fontSize: 18, fontWeight: "600", color: TEXT_PRIMARY },
  orderDetail: { fontSize: 14, color: TEXT_SECONDARY, marginTop: 6 },
  orderDivider: {
    height: 1,
    backgroundColor: "#3A3A3A",
    marginVertical: 16,
  },
  orderTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderTotalLabel: { fontSize: 18, fontWeight: "600", color: TEXT_PRIMARY },
  orderTotalPrice: { fontSize: 22, fontWeight: "600", color: ACCENT },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionLabel: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    backgroundColor: INPUT_BG,
    color: TEXT_PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  payBtn: {
    backgroundColor: ACCENT,
    marginHorizontal: 20,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  payBtnDisabled: { opacity: 0.5 },
  errorText: {
    color: "#E57373",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 24,
  },
  payBtnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  disclaimer: {
    color: TEXT_SECONDARY,
    fontSize: 12,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 16,
    lineHeight: 18,
  },
  confirmWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  checkmark: {
    fontSize: 64,
    color: "#4CAF50",
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: TEXT_PRIMARY,
    marginBottom: 16,
  },
  confirmText: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 24,
  },
  confirmEmail: {
    fontSize: 14,
    color: ACCENT,
    marginTop: 20,
    textAlign: "center",
  },
  doneBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 32,
  },
  doneBtnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
