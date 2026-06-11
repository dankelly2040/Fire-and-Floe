import { Image } from "expo-image";
import { openBrowserAsync } from "expo-web-browser";
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
    image: require("@/assets/sauna-interior.webp"),
  },
  {
    id: "buyout",
    title: "Private Sauna",
    price: "Starts at $400",
    image: require("@/assets/private-sauna.webp"),
  },
];

const EXTRAS = [
  {
    id: "events",
    title: "Special Events",
    description:
      "Sauna sessions under the moon, oysters by the fire, and chef-driven seasonal dinners.",
    image: require("@/assets/special-events-new.webp"),
    href: "/events" as const,
    externalUrl: null,
  },
  {
    id: "membership",
    title: "Membership",
    description:
      "The best deal for those wanting to visit more than twice a week. Unlimited access.",
    image: require("@/assets/membership.webp"),
    href: null,
    externalUrl: "https://minside.periode.no/signup/jZPTXG1wJPWZhhjW3gxL",
  },
  {
    id: "punch-pass",
    title: "Punch Pass",
    description:
      "Multi-session packages for building sauna into your weekly rhythm.",
    image: require("@/assets/punch-pass-new.jpg"),
    href: null,
    externalUrl: "https://minside.periode.no/m/7Rnv6gI4q8eaTuU5uSQA/punch-pass/om9Ss3d4nA4C05JvF4Kf",
  },
  {
    id: "gift-cards",
    title: "Gift Cards",
    description: "Give the gift of restoration to family and friends.",
    image: require("@/assets/gift-cards.webp"),
    href: null,
    externalUrl: "https://minside.periode.no/gift-card/3rx1CJKAidYlHo1AY3jM",
  },
];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const heroHeight = height * 0.55;
  const cardWidth = width * 0.62;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: BG, paddingBottom: 100 }}
      >
        {/* Hero */}
        <View style={{ height: heroHeight }}>
          <Image
            source={heroBg}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            contentFit="cover"
          />
          {/* Gradient fade: image to black */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "70%",
              experimental_backgroundImage: `linear-gradient(to bottom, transparent 0%, ${BG} 80%)`,
            }}
          />
          {/* Text positioned at the bottom, within the fade */}
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, alignItems: "center", paddingBottom: 20, paddingHorizontal: 24 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: TEXT_PRIMARY,
                letterSpacing: 4,
              }}
            >
              FIRE + FLOE
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: TEXT_SECONDARY,
                marginTop: 10,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Nature-based contrast therapy{"\n"}on Bainbridge Island
            </Text>
          </View>
        </View>

        {/* Experiences */}
        <View style={{ marginTop: 40, paddingLeft: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: TEXT_PRIMARY,
              marginBottom: 14,
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
              <Pressable style={{ width: cardWidth }}>
                <Image
                  source={exp.image}
                  style={{
                    width: "100%",
                    aspectRatio: 5 / 4,
                    borderRadius: 12,
                    borderCurve: "continuous",
                  }}
                  contentFit="cover"
                />
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: TEXT_PRIMARY,
                    marginTop: 10,
                  }}
                >
                  {exp.title}
                </Text>
                <Text style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 2 }}>
                  {exp.price}
                </Text>
              </Pressable>
            </Link>
          ))}
        </ScrollView>

        {/* More offerings */}
        <View style={{ marginTop: 32, paddingHorizontal: 20, gap: 12 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: TEXT_PRIMARY,
              marginBottom: 4,
            }}
          >
            More
          </Text>

          {EXTRAS.map((item) => {
            const card = (
              <Pressable
                style={{
                  borderRadius: 14,
                  borderCurve: "continuous",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: "100%", height: 160 }}
                  contentFit="cover"
                />
                <View style={{ backgroundColor: CARD_BG, padding: 16, gap: 4 }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "600",
                      color: TEXT_PRIMARY,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: TEXT_SECONDARY,
                      lineHeight: 18,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            );

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} asChild>
                  {card}
                </Link>
              );
            }
            if (item.externalUrl) {
              return (
                <Pressable
                  key={item.id}
                  onPress={() => openBrowserAsync(item.externalUrl!)}
                >
                  {card}
                </Pressable>
              );
            }
            return <View key={item.id}>{card}</View>;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
