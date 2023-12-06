import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function loginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 100,
          gap: 20,
        }}
      >
        <Image
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain",
            marginBottom: 20,
          }}
          source={require("../assets/images/gearImage.png")}
        />
        <View style={{ width: "90%" }}>
          <Text
            style={{
              fontSize: 36,
              textAlign: "center",
              width: "100%",
              fontWeight: "500",
            }}
          >
            Welcome Back
          </Text>
          <Text style={{ width: "100%", textAlign: "center", fontSize: 18 }}>
            The decentralized web awaits
          </Text>
        </View>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          style={{
            width: "90%",
            height: 50,
            backgroundColor: "#B3CDDD",
            borderRadius: 10,
            padding: 10,
            fontSize: 16,
            fontWeight: "500",
            color: "#767E93",
          }}
        />
        <Pressable
          //   onPress={() => {
          //     if (password !== confirmPassword) {
          //       Alert.alert("Passwords do not match");
          //     } else {
          //       Storage.setItem({ key: "password", value: password });
          //       router.push("/(walletSetup)/seedPhrase");
          //     }
          //   }}
          onPress={() => {
            Storage.getItem({ key: "password" }).then((res) => {
              if (res === password) {
                router.push("/(tabs)/");
              }
            });
          }}
          style={{
            paddingVertical: 20,
            backgroundColor: "#000000",
            minWidth: "90%",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            LogIn
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
