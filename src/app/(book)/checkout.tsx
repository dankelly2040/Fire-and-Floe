import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const saunaInterior = require("@/assets/sauna-interior.webp");
const privateSauna = require("@/assets/private-sauna.webp");

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
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const orderImage = isPrivate ? privateSauna : saunaInterior;

  if (confirmed) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: BG,
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <Text style={{ fontSize: 64, color: "#4CAF50", marginBottom: 16 }}>
          ✓
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
            color: TEXT_PRIMARY,
            marginBottom: 16,
          }}
        >
          Booking Confirmed!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: TEXT_SECONDARY,
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          {isPrivate
            ? "Private Buyout"
            : `${seats} Seat${seats > 1 ? "s" : ""}`}
          {"\n"}
          {formatDate(params.date ?? "")}
          {"\n"}
          {params.time}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: ACCENT,
            marginTop: 20,
            textAlign: "center",
          }}
        >
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
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            Done
          </Text>
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
      {/* Header bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 56,
          paddingBottom: 16,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "rgba(255,255,255,0.1)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            ‹
          </Text>
        </Pressable>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: TEXT_PRIMARY,
          }}
        >
          Checkout
        </Text>
        {/* Avatar placeholder */}
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#3A3A3A",
          }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, gap: 24 }}>
        {/* Order summary card with image */}
        <View
          style={{
            backgroundColor: CARD_BG,
            borderRadius: 16,
            borderCurve: "continuous",
            overflow: "hidden",
          }}
        >
          <Image
            source={orderImage}
            style={{ width: "100%", height: 160 }}
            contentFit="cover"
          />
          <View style={{ padding: 16, gap: 4 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: TEXT_PRIMARY,
                }}
              >
                {isPrivate ? "Private buyout" : "Community session"}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: ACCENT,
                }}
              >
                ${price.toFixed(2)}
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: TEXT_SECONDARY }}>
              {formatDate(params.date ?? "")}
            </Text>
            <Text style={{ fontSize: 14, color: TEXT_SECONDARY }}>
              4 hours max · {isPrivate ? "Private group" : `${seats} person${seats > 1 ? "s" : ""}`}
            </Text>
          </View>
        </View>

        {/* Discount code */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Discount code"
            placeholderTextColor="#666"
            value={promoCode}
            onChangeText={setPromoCode}
            autoCapitalize="characters"
            style={{
              flex: 1,
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
          <Pressable>
            <Text
              style={{
                color: ACCENT,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Apply
            </Text>
          </Pressable>
        </View>

        {/* Contact information */}
        <View style={{ gap: 12 }}>
          <Text
            style={{
              color: TEXT_PRIMARY,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Contact information
          </Text>
          <TextInput
            placeholder="Full name"
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
            placeholder="Email address"
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

        {/* Proceed to payment */}
        <Pressable
          onPress={() => setConfirmed(true)}
          disabled={!name || !email}
          style={{
            backgroundColor: ACCENT,
            paddingVertical: 16,
            borderRadius: 24,
            borderCurve: "continuous",
            alignItems: "center",
            opacity: !name || !email ? 0.5 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
            Proceed to payment
          </Text>
        </Pressable>

        <Text
          style={{
            color: TEXT_SECONDARY,
            fontSize: 11,
            textAlign: "center",
            lineHeight: 16,
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
