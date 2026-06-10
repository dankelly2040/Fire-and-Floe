import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const heroBg = require("@/assets/hero-bg.jpg");

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const CARD_BG = "#2A2A2A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

const EXPERIENCES = [
  {
    id: "community",
    title: "Camp Sauna Sessions",
    price: "$32/person",
    image: require("@/assets/camp-sauna.png"),
  },
  {
    id: "buyout",
    title: "Private Sauna",
    price: "Starts at $400",
    image: require("@/assets/private-sauna.webp"),
  },
];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const heroHeight = height * 0.58;
  const cardWidth = width * 0.65;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: BG }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Hero */}
      <View style={{ height: heroHeight, justifyContent: "flex-end" }}>
        <Image
          source={heroBg}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(transparent 30%, rgba(0,0,0,0.7))",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
        <View style={{ alignItems: "center", paddingBottom: 40, paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: "800",
              color: TEXT_PRIMARY,
              letterSpacing: 6,
            }}
          >
            FIRE + FLOE
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: TEXT_SECONDARY,
              marginTop: 12,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Nature-based contrast therapy on{"\n"}Bainbridge Island
          </Text>
        </View>
      </View>

      {/* Experiences */}
      <View style={{ marginTop: 28, paddingLeft: 20 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: TEXT_PRIMARY,
            marginBottom: 16,
          }}
        >
          Experiences
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, gap: 14 }}
        decelerationRate="fast"
        snapToInterval={cardWidth + 14}
        snapToAlignment="start"
      >
        {EXPERIENCES.map((exp) => (
          <Link key={exp.id} href="/book" asChild>
            <Pressable
              style={{
                width: cardWidth,
                backgroundColor: CARD_BG,
                borderRadius: 16,
                borderCurve: "continuous",
                overflow: "hidden",
              }}
            >
              <Image
                source={exp.image}
                style={{ width: "100%", aspectRatio: 4 / 3 }}
                contentFit="cover"
              />
              <View style={{ padding: 16, gap: 4 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    color: TEXT_PRIMARY,
                  }}
                >
                  {exp.title}
                </Text>
                <Text style={{ fontSize: 14, color: ACCENT, fontWeight: "600" }}>
                  {exp.price}
                </Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </ScrollView>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
