import { Image } from "expo-image";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EVENTS } from "@/data/events";

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

export default function EventDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: BG,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: TEXT_SECONDARY }}>Event not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero image */}
        <Image
          source={event.image}
          style={{ width: "100%", height: 280 }}
          contentFit="cover"
        />

        {/* Back button overlaid on image */}
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: insets.top + 8,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            ‹
          </Text>
        </Pressable>

        <View style={{ padding: 20, gap: 12 }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              color: TEXT_PRIMARY,
            }}
          >
            {event.title}
          </Text>
          <Text style={{ fontSize: 14, color: ACCENT, fontWeight: "600" }}>
            {event.date}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: TEXT_SECONDARY,
              lineHeight: 23,
            }}
          >
            {event.details}
          </Text>

          <Link href="/book" asChild>
            <Pressable
              style={{
                backgroundColor: ACCENT,
                paddingVertical: 16,
                borderRadius: 24,
                borderCurve: "continuous",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
                Book a session
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
