import { Wallet } from "ethers";
import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";

export default function ImportSeedPhrase() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handelSubmit = async () => {
    const wallet = Wallet.fromPhrase(seedPhrase.trim());
    await Storage.setItem({ key: "privateKEY", value: wallet.privateKey });
    await Storage.setItem({ key: "address", value: wallet.address });
    await Storage.setItem({ key: "password", value: password });
    await Storage.setItem({ key: "walletActive", value: "true" });
    setLoading(false);
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
      <Text
        style={{
          fontSize: 16,
          width: "90%",
          fontWeight: "300",
          color: "#767E93",
        }}
      >
        Import an existing wallet using your 12 or 24 word seed phrase.
      </Text>

      <TextInput
        placeholder="Seed Phrase"
        // secureTextEntry={true}
        value={seedPhrase}
        onChange={(e) => setSeedPhrase(e.nativeEvent.text)}
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

          if (
            seedPhrase.split(" ").length == 12 ||
            seedPhrase.split(" ").length == 24
          ) {
            if (password !== confirmPassword) {
              Alert.alert("Passwords do not match");
              setLoading(false);
            } else if (password.length < 8) {
              Alert.alert("Password must be at least 8 characters long");
              setLoading(false);
            } else handelSubmit();
          } else {
            Alert.alert("Invalid Seed Phrase");
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
            <ActivityIndicator
              color={"#336C9B"}
              color={"white"}
              animating={loading}
            />
          ) : (
            "Continue Import"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
