import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";

const hatsImage = require("@/assets/shop-hats.webp");
const roomScent = require("@/assets/shop-room-scent.webp");
const saunaScent = require("@/assets/shop-sauna-scent.webp");

const BG = "#1A1A1A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

const PRODUCTS = [
  {
    id: "rope-cap",
    title: "Fire+Floe Rope Cap",
    price: "$40",
    image: hatsImage,
    url: "https://fireandfloe.com/ols/products/rope-cap",
  },
  {
    id: "room-spray",
    title: "Birch Sauna Room Spray",
    price: "$25",
    image: roomScent,
    url: "https://fireandfloe.com/ols/products/birch-sauna-room-spray",
  },
  {
    id: "scented-oil",
    title: "Birch Sauna Scented Oil",
    price: "$25",
    image: saunaScent,
    url: "https://fireandfloe.com/ols/products/birch-sauna-scented-oil",
  },
];

export default function ShopScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 20 * 2 - 14) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20, paddingTop: 60 }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
            color: TEXT_PRIMARY,
            marginBottom: 24,
          }}
        >
          Shop
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 14 }}>
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={{ pathname: "/product", params: { url: product.url, title: product.title } }}
              asChild
            >
              <Pressable style={{ width: cardWidth }}>
                <Image
                  source={product.image}
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    borderRadius: 12,
                    borderCurve: "continuous",
                  }}
                  contentFit="cover"
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: TEXT_PRIMARY,
                    marginTop: 10,
                  }}
                  numberOfLines={2}
                >
                  {product.title}
                </Text>
                <Text style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 2 }}>
                  {product.price}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
