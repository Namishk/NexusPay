import Storage from "expo-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
export default function RecievePayment() {
  const [adress, setAdress] = useState("");
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
        paddingTop: 100,
        gap: 20,
        backgroundColor: "#F8F8F9",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          color: "#000000",
          textAlign: "center",
          width: "90%",
          marginBottom: 20,
        }}
      >
        Recieve Payment
      </Text>
      <QRCode value={adress} size={300} backgroundColor="#ffffff" />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          textAlign: "center",
          width: "90%",
          marginTop: 20,
        }}
      >
        Your adress is: {adress}
      </Text>
    </View>
  );
}
