import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { useState } from "react";
import { View, Text, Image, Pressable, Alert, TextInput } from "react-native";

export default function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  return (
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
        This password will unlock your wallet only on this device
      </Text>

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        style={{
          width: "90%",
          height: 50,
          backgroundColor: "#D7E4E3",
          borderRadius: 10,
          padding: 10,
          fontSize: 16,
          fontWeight: "300",
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
          backgroundColor: "#D7E4E3",
          borderRadius: 10,
          padding: 10,
          fontSize: 16,
          fontWeight: "300",
          color: "#767E93",
        }}
      />

      <Pressable
        onPress={() => {
          if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
          } else {
            Storage.setItem({ key: "password", value: password });
            router.push("/(walletSetup)/seedPhrase");
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
            color: "#F5FA80",
          }}
        >
          Create Password
        </Text>
      </Pressable>
    </View>
  );
}
