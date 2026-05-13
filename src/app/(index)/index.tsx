import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const heroBg = require("@/assets/hero-bg.jpg");

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const CARD_BG = "#2A2A2A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

const SERVICES = [
  {
    id: "community",
    title: "Camp Sauna Session",
    subtitle: "Sauna + Cold Plunge",
    description:
      "Book a seat in a camp sauna session. Come with friends or meet new friends in the sauna! Choose just the sauna or join in on contrast therapy, ebbing between the sauna and the cold waters of Bainbridge Island.",
    price: "$32",
    image: require("@/assets/camp-sauna.png"),
  },
  {
    id: "buyout",
    title: "Private Sauna",
    subtitle: "Exclusive 2.5-Hour Experience",
    description:
      "Enjoy an exclusive 2.5-hour private sauna experience where you'll have time to relax, reset, and reconnect. Perfect for individuals, couples, or groups seeking a wellness escape.",
    price: "From $400",
    image: require("@/assets/private-sauna.webp"),
  },
  {
    id: "special",
    title: "Special Events",
    subtitle: "Unique Sauna Gatherings",
    description:
      "Join us for themed sauna nights, seasonal celebrations, and community wellness events. Check our schedule for upcoming special experiences.",
    price: "Varies",
    image: require("@/assets/Special events.webp"),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width > 700;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.hero}>
        <Image source={heroBg} style={styles.heroBg} contentFit="cover" />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.logo}>FIRE + FLOE</Text>
          <Text style={styles.tagline}>
            A gathering place for restoration and connection
          </Text>
          <Text style={styles.location}>Bainbridge Island, WA</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Experiences</Text>
        <View style={[styles.cards, isWide && styles.cardsRow]}>
          {SERVICES.map((service) => (
            <Pressable
              key={service.id}
              style={[styles.card, isWide && styles.cardWide]}
              onPress={() => router.push("/book")}
            >
              <Image
                source={service.image}
                style={styles.cardImage}
                contentFit="cover"
              />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardSubtitle}>{service.subtitle}</Text>
                <Text style={styles.cardDescription}>
                  {service.description}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardPrice}>{service.price}</Text>
                  <View style={styles.bookBtn}>
                    <Text style={styles.bookBtnText}>Book Now</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Experience</Text>
        <View style={styles.featureRow}>
          {[
            { icon: "🔥", label: "Hot Sauna", desc: "Traditional wood-fired" },
            { icon: "🧊", label: "Cold Plunge", desc: "Bainbridge Island waters" },
            { icon: "🔁", label: "Repeat", desc: "Flow at your own pace" },
          ].map((f) => (
            <View key={f.label} style={styles.feature}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureLabel}>{f.label}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, styles.promoSection]}>
        <Text style={styles.promoTitle}>Gift Cards & Punch Passes</Text>
        <Text style={styles.promoText}>
          Give the gift of restoration or save with multi-visit punch passes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { paddingBottom: 40 },
  hero: {
    height: 350,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  heroContent: {
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: TEXT_PRIMARY,
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    marginTop: 12,
    textAlign: "center",
  },
  location: {
    fontSize: 13,
    color: ACCENT,
    marginTop: 8,
    fontWeight: "600",
    letterSpacing: 1,
  },
  section: { paddingHorizontal: 20, marginTop: 8 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 16,
  },
  cards: { gap: 20 },
  cardsRow: { flexDirection: "row" },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardWide: { flex: 1 },
  cardImage: { width: "100%", height: 200 },
  cardBody: { padding: 20 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: TEXT_PRIMARY },
  cardSubtitle: {
    fontSize: 14,
    color: ACCENT,
    fontWeight: "600",
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    marginTop: 10,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  cardPrice: { fontSize: 22, fontWeight: "800", color: TEXT_PRIMARY },
  bookBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
    marginBottom: 24,
  },
  feature: { alignItems: "center", flex: 1 },
  featureIcon: { fontSize: 32, marginBottom: 8 },
  featureLabel: { fontSize: 15, fontWeight: "700", color: TEXT_PRIMARY },
  featureDesc: { fontSize: 12, color: TEXT_SECONDARY, marginTop: 4, textAlign: "center" },
  promoSection: {
    backgroundColor: CARD_BG,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginTop: 24,
  },
  promoTitle: { fontSize: 18, fontWeight: "700", color: TEXT_PRIMARY },
  promoText: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
});
