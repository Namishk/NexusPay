import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("false");
  const router = useRouter();
  useEffect(() => {
    Storage.getItem({ key: "walletActive" }).then((res) => {
      setActive(res);
    });
  });
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 10,
          gap: 20,
        }}
      >
        <Image
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain",
          }}
          source={require("../../assets/images/secure.png")}
        />
        <Text
          style={{
            fontSize: 24,
            textAlign: "left",
            width: "90%",
            fontWeight: "bold",
          }}
        >
          Create Password
        </Text>
        <Text
          style={{
            fontSize: 16,
            width: "90%",
            fontWeight: "300",
            color: "#767E93",
          }}
        >
          This password will unlock your NexusPay wallet only on this device
        </Text>

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

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
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

        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            console.log("redirecting4");

            if (password !== confirmPassword) {
              Alert.alert("Passwords do not match");
            } else if (password.length < 8) {
              Alert.alert("Password must be at least 8 characters long");
            } else {
              setLoading(true);
              Storage.setItem({ key: "password", value: password }).then(() => {
                console.log("redirecting3");
                setLoading(false);
              });
              if (active == "false") {
                console.log("redirecting2");

                router.push("/(walletSetup)/seedPhrase");
              } else if (active == "true") {
                console.log("redirecting1");

                router.push("/(tabs)/");
              }
              console.log("redirecting");
              router.push("/(walletSetup)/seedPhrase");

              setLoading(false);
            }
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
            {loading ? (
              <ActivityIndicator color={"#336C9B"} color={"white"} />
            ) : (
              "Create Password"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
