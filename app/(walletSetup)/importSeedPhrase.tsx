import { Wallet } from "ethers";
import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { useState } from "react";
import { View, Text, Image, Pressable, Alert, TextInput } from "react-native";

export default function ImportSeedPhrase() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const router = useRouter();
  const handelSubmit = async () => {
    const wallet = Wallet.fromPhrase(seedPhrase);
    await Storage.setItem({ key: "privateKEY", value: wallet.privateKey });
    await Storage.setItem({ key: "address", value: wallet.address });
    Storage.setItem({ key: "password", value: password });
    router.push("/(tabs)/");
  };
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
        Import From Seed
      </Text>
      {/* <Text
        style={{
          fontSize: 16,
          width: "90%",
          fontWeight: "300",
          color: "#767E93",
        }}
      >
        This password will unlock your wallet only on this device
      </Text> */}

      <TextInput
        placeholder="Seed Phrase"
        // secureTextEntry={true}
        value={seedPhrase}
        onChange={(e) => setSeedPhrase(e.nativeEvent.text)}
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
          if (
            seedPhrase.split(" ").length == 12 ||
            seedPhrase.split(" ").length == 24
          ) {
            if (password !== confirmPassword) {
              Alert.alert("Passwords do not match");
            } else router.push("/(walletSetup)/seedPhrase");
          } else Alert.alert("Invalid Seed Phrase");
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
          Continue Import
        </Text>
      </Pressable>
    </View>
  );
}