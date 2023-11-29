import { View, Text, Image } from "react-native";
//@ts-ignore
import { Storage } from "expo-storage";
export default function WalletSetup() {
  return (
    <View className="felx fex-col justify-center items-center">
      <Image source={require("../../assets/images/gearImage.png")} />
    </View>
  );
}
