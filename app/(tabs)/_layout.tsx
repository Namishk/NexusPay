import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#336C9B",
        headerStyle: {
          backgroundColor: "#B3CDDD",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: "Make a Payment",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="payments"
              size={28}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recieve"
        options={{
          title: "Recieve Payment",
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          // headerShown: false,
        }}
      />
    </Tabs>
  );
}
