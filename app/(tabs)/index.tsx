import "react-native-get-random-values";

import { Text, View } from "../../components/Themed";
import { generateMnemonic } from "bip39";
import { Wallet, ethers, formatEther } from "ethers";
import { useEffect, useState } from "react";
import Storage from "expo-storage";
export default function TabOneScreen() {
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState(null);
  const mnemonics = generateMnemonic();

  // const mnemonics =
  //   "shrug cat ship just vanish buzz inhale quiz wine frequent expand vacant";
  useEffect(() => {
    Storage.getItem({ key: "privateKEY" }).then((res) => {
      const wallet = new ethers.Wallet(res);
      setWallet(wallet);
    });
  }, []);
  // const wallet = Wallet.fromPhrase(mnemonics);
  // console.log(wallet.address);
  let headers = new Headers();
  headers.set("Authorization", "Bearer cqt_rQ8f7H6mXJxbYcWqpdXFkG4FRjPW");

  fetch(
    `https://api.covalenthq.com/v1/eth-sepolia/address/${wallet.address}/balances_v2/?`,
    { method: "GET", headers: headers }
  )
    .then((resp) => resp.json())
    .then((data) => {
      setBalance(Number(formatEther(data.data.items[0].balance)));
      console.log(formatEther(data.data.items[0].balance));
    });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Text style={{ fontWeight: "400", fontSize: 18 }}>
          Mnemonic : {mnemonics}
        </Text>
        <Text style={{ fontWeight: "400", fontSize: 18 }}>
          Public Key : {wallet.publicKey}
        </Text>
        <Text style={{ fontWeight: "400", fontSize: 18 }}>
          Private Key : {wallet.privateKey}
        </Text>
        <Text style={{ fontWeight: "400", fontSize: 18 }}>
          Address : {wallet.address}
        </Text>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>
          Balance : {balance}
        </Text>
      </View>
    </View>
  );
}
