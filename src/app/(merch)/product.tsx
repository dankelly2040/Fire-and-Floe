import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BG = "#1A1A1A";
const TEXT_PRIMARY = "#F5F0EB";

export default function ProductScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          backgroundColor: BG,
          gap: 12,
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
            fontSize: 18,
            fontWeight: "600",
            color: TEXT_PRIMARY,
            flex: 1,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* WebView — bottom margin keeps the page's fixed-bottom elements
          (cookie banner, add-to-cart bar) above the floating tab bar */}
      <WebView
        source={{ uri: url ?? "" }}
        style={{ flex: 1, backgroundColor: BG, marginBottom: insets.bottom + 49 }}
      />
    </View>
  );
}
