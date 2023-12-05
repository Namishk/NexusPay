import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getAddress } from "ethers";
import { Redirect, useRouter } from "expo-router";
export default function Payment() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      console.log(getAddress(data));
      // Alert.alert(
      //   "Payment Successful",
      //   `You have successfully sent 0.01 ETH to ${getAddress(data)}`
      // );
      router.replace(`/paymentReciver/${data}`);
    } catch (err) {
      Alert.alert(
        "Invalid QR Code",
        "Please Scan a Valid QR Code to make a payment"
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingTop: 100,
        marginTop: 30,
        gap: 20,
        backgroundColor: "#F8F8F9",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Pressable
          onPress={() => setScanned(false)}
          style={{
            backgroundColor: "#F5FA80",
            padding: 10,
            borderRadius: 10,
            marginVertical: 20,
          }}
        >
          <Text>Tap to Scan Again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
