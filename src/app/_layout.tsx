import { ThemeProvider } from "@/components/theme-provider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";

const TINT = "#C45C26";

export default function Layout() {
  return (
    <ThemeProvider>
      {process.env.EXPO_OS === "web" ? (
        <WebTabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: TINT,
            tabBarStyle: { backgroundColor: "#1A1A1A", borderTopColor: "#2A2A2A" },
            tabBarInactiveTintColor: "#B8AFA6",
          }}
        >
          <WebTabs.Screen
            name="(index)"
            options={{
              title: "Home",
              tabBarIcon: (props) => <MaterialIcons {...props} name="home" />,
            }}
          />
          <WebTabs.Screen
            name="(book)"
            options={{
              title: "Book",
              tabBarIcon: (props) => <MaterialIcons {...props} name="event" />,
            }}
          />
          <WebTabs.Screen
            name="(merch)"
            options={{
              title: "Shop",
              tabBarIcon: (props) => <MaterialIcons {...props} name="storefront" />,
            }}
          />
          <WebTabs.Screen
            name="(cart)"
            options={{
              title: "Cart",
              tabBarIcon: (props) => (
                <MaterialIcons {...props} name="shopping-bag" />
              ),
            }}
          />
          <WebTabs.Screen
            name="(checkout)"
            options={{ href: null }}
          />
        </WebTabs>
      ) : (
        <NativeTabs tintColor={TINT} minimizeBehavior="onScrollDown">
          <NativeTabs.Trigger name="(index)">
            <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              sf={{ default: "house", selected: "house.fill" }}
              md="home"
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(book)">
            <NativeTabs.Trigger.Label>Book</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              sf={{ default: "calendar", selected: "calendar" }}
              md="calendar_today"
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(merch)">
            <NativeTabs.Trigger.Label>Shop</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              sf={{ default: "tshirt", selected: "tshirt.fill" }}
              md="storefront"
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(cart)">
            <NativeTabs.Trigger.Label>Cart</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              sf={{ default: "bag", selected: "bag.fill" }}
              md="shopping_bag"
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(checkout)" hidden>
            <NativeTabs.Trigger.Label>Checkout</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      )}
    </ThemeProvider>
  );
}
