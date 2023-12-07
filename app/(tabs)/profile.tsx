import {
  Linking,
  PlatformColor,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function Profile() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        gap: 20,
        backgroundColor: "#F8F8F9",
      }}
    >
      <TouchableOpacity
        style={{
          paddingVertical: 20,
          backgroundColor: "#B3CDDD",
          paddingHorizontal: 20,
          borderRadius: 10,
          minWidth: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 20,
          alignItems: "center",
        }}
        onPress={() => {
          router.push("/(walletSetup)/createPassword");
        }}
      >
        <MaterialCommunityIcons name="lock-reset" size={24} color={"black"} />
        <Text
          style={{
            fontSize: 18,
            color: "#000000",
            fontWeight: "600",
          }}
        >
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://github.com/namishk")}
      >
        <Text>Made with ❤️ by @NamishK</Text>
      </TouchableOpacity>
    </View>
  );
}
