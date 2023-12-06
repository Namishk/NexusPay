import Storage from "expo-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function RecievePayment() {
  const [adress, setAdress] = useState("");
  const copyToClipboard = async ({ item }: { item: string }) => {
    await Clipboard.setStringAsync(item);
  };

  useEffect(() => {
    Storage.getItem({ key: "address" }).then((res) => {
      setAdress(res);
    });
  }, []);
  if (adress.length === 0) {
    return <Text>Loading...</Text>;
  }
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 10,
        gap: 20,
        backgroundColor: "#F8F8F9",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: 20,
          paddingVertical: 30,
          borderRadius: 20,
          marginTop: 20,
          gap: 20,
          backgroundColor: "#B3CDDD",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            backgroundColor: "#B3CDDD",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#000000",
              textAlign: "center",
              width: "90%",
              marginTop: 20,
            }}
          >
            Requesting payment for
          </Text>
          <Pressable
            style={{ display: "flex", flexDirection: "row", gap: 4 }}
            onPress={() => copyToClipboard({ item: adress })}
          >
            <MaterialCommunityIcons
              name="content-copy"
              size={24}
              color="black"
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                textAlignVertical: "center",
              }}
            >
              {adress}
            </Text>
          </Pressable>
        </View>
        <QRCode
          value={adress}
          size={300}
          backgroundColor="#F8F8F9"
          logo={require("../../assets/images/iconCircle.png")}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: "300",
            textAlign: "center",
            width: "90%",
          }}
        >
          Scan to pay with NexusPay
        </Text>
      </View>
    </View>
  );
}
