import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const CARD_BG = "#2A2A2A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

const EVENTS = [
  {
    id: "oysters",
    title: "Oysters & Chowder",
    description:
      "Sauna session paired with fresh oysters and chowder from the Salish Sea. A community gathering by the water.",
    image: require("@/assets/event-oysters.jpg"),
    date: "Check schedule",
  },
  {
    id: "smores",
    title: "Sauna & S'mores",
    description:
      "Wind down with a sauna session followed by handmade s'mores by the fire. Perfect for families and friends.",
    image: require("@/assets/event-smores.jpeg"),
    date: "Check schedule",
  },
  {
    id: "moonlight",
    title: "Moonlight Sauna",
    description:
      "Experience the sauna under the moon. A serene evening session with views of the night sky over Bainbridge Island.",
    image: require("@/assets/event-moonlight.jpg"),
    date: "Check schedule",
  },
];

export default function EventsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: insets.top + 8 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            marginBottom: 20,
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
              fontSize: 24,
              fontWeight: "600",
              color: TEXT_PRIMARY,
              marginLeft: 12,
            }}
          >
            Special Events
          </Text>
        </View>

        {/* Event cards */}
        <View style={{ paddingHorizontal: 20, gap: 16 }}>
          {EVENTS.map((event) => (
            <Pressable
              key={event.id}
              style={{
                borderRadius: 14,
                borderCurve: "continuous",
                overflow: "hidden",
              }}
            >
              <Image
                source={event.image}
                style={{ width: "100%", height: 200 }}
                contentFit="cover"
              />
              <View style={{ backgroundColor: CARD_BG, padding: 16, gap: 6 }}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "600",
                    color: TEXT_PRIMARY,
                  }}
                >
                  {event.title}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: ACCENT,
                    fontWeight: "600",
                  }}
                >
                  {event.date}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: TEXT_SECONDARY,
                    lineHeight: 20,
                  }}
                >
                  {event.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
