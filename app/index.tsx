import { View, Text, ActivityIndicator } from "react-native";
//@ts-ignore
import { Storage } from "expo-storage";
import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { ethers } from "ethers";

export default function OnboardingPage() {
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getPrivateKey() {
    setLoading(true);
    const item = await Storage.getItem({ key: "walletActive" });
    const test = await Storage.getItem({ key: "privateKEY" });
    console.log(test);
    console.log(item);
    setLoading(false);
    return item;
  }
  useEffect(() => {
    getPrivateKey().then((res) => {
      setActive(res);
    });
  }, []);
  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  } else {
    if (active == "true") {
      console.log("redirecting TABS");
      return <Redirect href={"/loginPage"} />;
    } else {
      return <Redirect href={"/(walletSetup)/walletSetup"} />;
    }
  }
}
