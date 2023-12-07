import { ethers, parseEther } from "ethers";
import { useLocalSearchParams, useRouter } from "expo-router";
import Storage from "expo-storage";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { adress } = useLocalSearchParams();
  const [amount, setAmount] = useState(0);
  const handelPay = async () => {
    console.log("paying");
    setLoading(true);
    let provider = ethers.getDefaultProvider("https://rpc.sepolia.org	");
    console.log("provider", provider);
    let wallet = new ethers.Wallet(
      //@ts-ignore
      await Storage.getItem({ key: "privateKEY" }),
      provider
    );
    console.log("wallet", wallet, parseEther(amount.toString()));
    try {
      wallet
        .sendTransaction({
          to: adress,
          value: parseEther(amount.toString()),
          chainId: "11155111",
        })
        .then((res) => {
          console.log(res.hash);
          Alert.alert("Payment sent", res.hash);
          setLoading(false);
          router.replace("/(tabs)/");
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Error", err?.shortMessage);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      Alert.alert("Error", err?.shortMessage);
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50,
        gap: 20,
        backgroundColor: "#F8F8F9",
      }}
    >
      <View
        style={{
          minWidth: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Paying
        </Text>
        <Text style={{ fontStyle: "italic" }}>{adress}</Text>
      </View>
      <TextInput
        placeholder="Amount in ETH"
        keyboardType="numeric"
        value={amount.toString()}
        onChange={(e) => setAmount(e.nativeEvent.text)}
        style={{
          width: "90%",
          height: 50,
          backgroundColor: "#B3CDDD",
          borderRadius: 10,
          padding: 10,
          fontSize: 16,
          fontWeight: "500",
          marginVertical: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => handelPay()}
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
          {
            //@ts-ignore
            loading ? (
              <ActivityIndicator
                color={"#336C9B"}
                animating={loading}
                size={"small"}
                color={"#F5FA80"}
              />
            ) : (
              "Pay"
            )
          }
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)/")}
        style={{
          paddingVertical: 20,
          backgroundColor: "#B3CDDD",
          minWidth: "90%",
          borderRadius: 10,
          shadowColor: "#171717",
          shadowOffset: { width: -4, height: -4 },
          shadowOpacity: 1,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
            color: "#000000",
          }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}
