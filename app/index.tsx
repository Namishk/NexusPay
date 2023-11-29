import { View, Text } from "react-native";
//@ts-ignore
import { Storage } from "expo-storage";
import { useEffect, useState } from "react";
import { Redirect } from "expo-router";

export default function OnboardingPage() {
  const [privateKey, setPrivateKey] = useState(null);
  async function getPrivateKey() {
    const item = JSON.parse(await Storage.getItem({ key: "privateKEY" }));
    return item;
  }
  useEffect(() => {
    getPrivateKey().then((res) => {
      setPrivateKey(res);
    });
  }, []);
  if (!privateKey) return <Redirect href={"/(walletSetup)/walletSetup"} />;
  return (
    <View>
      <Text>OnboardingPage</Text>
      {privateKey && <Text>{privateKey}</Text>}
    </View>
  );
}
