import { ThemeProvider } from "@/components/theme-provider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function Layout() {
  return (
    <ThemeProvider>
      {process.env.EXPO_OS === "web" ? (
        <WebTabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#C45C26",
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
              tabBarIcon: (props) => (
                <MaterialIcons {...props} name="calendar-today" />
              ),
            }}
          />
          <WebTabs.Screen
            name="(checkout)"
            options={{
              title: "Checkout",
              tabBarIcon: (props) => (
                <MaterialIcons {...props} name="shopping-cart" />
              ),
            }}
          />
        </WebTabs>
      ) : (
        <NativeTabs>
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
          <NativeTabs.Trigger name="(checkout)">
            <NativeTabs.Trigger.Label>Checkout</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              sf={{ default: "cart", selected: "cart.fill" }}
              md="shopping_cart"
            />
          </NativeTabs.Trigger>
        </NativeTabs>
      )}
    </ThemeProvider>
  );
}
