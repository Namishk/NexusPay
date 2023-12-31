import "react-native-get-random-values";
import { Text, View } from "../../components/Themed";
import { generateMnemonic } from "bip39";
import { Wallet, ethers, formatEther } from "ethers";
import { useEffect, useState } from "react";
import Storage from "expo-storage";
import {
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
export default function TabOneScreen() {
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState();
  const [reloadBalance, setReloadBalance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pastTransactions, setPastTransactions] = useState([]);
  useEffect(() => {
    setLoading(true);
    setBalance(0);
    setPastTransactions([]);
    console.log("useEffect at TabOneScreen");
    Storage.getItem({ key: "privateKEY" }).then((res) => {
      console.log(res);
      const wallet = new ethers.Wallet(res);
      console.log(wallet);
      setWallet(wallet);
      let headers = new Headers();
      headers.set("Authorization", "Bearer cqt_rQ8f7H6mXJxbYcWqpdXFkG4FRjPW");

      fetch(
        `https://api.covalenthq.com/v1/eth-sepolia/address/${wallet?.address}/balances_v2/?`,
        { method: "GET", headers: headers }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setBalance(
            Number(formatEther(data.data.items[0].balance)).toFixed(4)
          );
          console.log(formatEther(data.data.items[0].balance));
        })
        .then(() => {
          fetch(
            `https://api.covalenthq.com/v1/eth-sepolia/address/${wallet?.address}/transactions_v3/?no-logs=true&with-safe=true`,
            { method: "GET", headers: headers }
          )
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data.data.items.length);
              setPastTransactions(data.data.items);
              setLoading(false);
            });
        });
    });
  }, [reloadBalance]);

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
      <View style={{ minWidth: "90%", backgroundColor: "#F8F8F9" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#F8F8F9",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 0,
          }}
        >
          {loading ? (
            <ActivityIndicator color={"#336C9B"} />
          ) : (
            <Text style={{ fontSize: 48 }}>{balance} ETH</Text>
          )}
          <TouchableOpacity
            onPress={() => setReloadBalance(!reloadBalance)}
            style={{
              // backgroundColor: "#F5FA80",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <FontAwesome name="refresh" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            marginVertical: 20,
            backgroundColor: "#F8F8F9",
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/payment")}
            style={{
              backgroundColor: "#B3CDDD",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "600" }}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/recieve")}
            style={{
              backgroundColor: "#B3CDDD",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "600" }}>Recieve</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Recent Transactions:
        </Text>
        <ScrollView
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minWidth: "90%",
            marginBottom: 20,
            borderRadius: 10,
            paddingBottom: 10,
          }}
        >
          {loading && (
            <ActivityIndicator
              color={"#336C9B"}
              animating={loading}
              size={"large"}
              color={"#F5FA80"}
            />
          )}
          {pastTransactions?.map((transaction, i) => {
            if (transaction?.value > 0 && transaction?.successful) {
              console.log(
                transaction.from_address == wallet?.address.toLowerCase()
              );
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF",
                    paddingHorizontal: 10,
                    paddingVertical: 30,
                    borderRadius: 10,
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {/* {transaction?.from_address?.slice(0, 4) +
                      "..." +
                      transaction?.from_address?.slice(-4)}{" "} -->{" "}{transaction?.to_address?.slice(0, 4) +
                      "..." +
                      transaction?.to_address?.slice(-4)} */}
                    {transaction?.from_address == wallet?.address.toLowerCase()
                      ? "Sent ETH"
                      : "Received ETH"}
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {formatEther(transaction?.value) + " ETH"}
                  </Text>
                </View>
              );
            } else return null;
          })}
        </ScrollView>
      </View>
    </View>
  );
}
