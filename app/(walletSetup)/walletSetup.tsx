import { View, Text, Image, Button, Pressable, Alert } from "react-native";
//@ts-ignore
import { Storage } from "expo-storage";
import { Link, useRouter } from "expo-router";
import { ethers } from "ethers";
export default function WalletSetup() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 20,
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
        source={require("../../assets/images/gearImage.png")}
      />
      <Text
        style={{
          fontSize: 48,
          textAlign: "left",
          width: "90%",
          fontWeight: "400",
        }}
      >
        Wallet Setup
      </Text>
      <View style={{ width: "90%" }}>
        <Text style={{ fontSize: 24, width: "75%", fontWeight: "300" }}>
          Import an existing wallet or create a new one
        </Text>
      </View>
      <Pressable
        onPress={() => router.push("/(walletSetup)/importSeedPhrase")}
        style={{
          paddingVertical: 20,
          backgroundColor: "#85A7C3",
          minWidth: "90%",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Import Using Seed Phrase
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(walletSetup)/createPassword")}
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
          Create a New Wallet
        </Text>
      </Pressable>
    </View>
  );
}
