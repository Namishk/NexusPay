import { generateMnemonic } from "bip39";
import { Wallet } from "ethers";
import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

export default function seedPhrase() {
  const [displaySeedPhrase, setDisplaySeedPhrase] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [mnemonics, setMnemonics] = useState("");
  const router = useRouter();
  useEffect(() => {
    const res = generateMnemonic();
    setMnemonics(res);
    console.log(mnemonics);
  }, []);
  const continueToWallet = async () => {
    if (mnemonics.length > 0) {
      console.log("continue to wallet");
      console.log(mnemonics);
      setShowLoader(true);
      const wallet = Wallet.fromPhrase(mnemonics);
      await Storage.setItem({ key: "privateKEY", value: wallet.privateKey });
      await Storage.setItem({ key: "address", value: wallet.address });
      await Storage.setItem({ key: "walletActive", value: "true" });
      router.push("/(tabs)/");
      setShowLoader(false);
    } else {
      Alert.alert("Error", "Please try again");
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
        paddingTop: 100,
        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          textAlign: "left",
          width: "90%",
          fontWeight: "bold",
        }}
      >
        Write Down Your Seed Phrase
      </Text>
      <Text
        style={{
          fontSize: 16,
          width: "90%",
          fontWeight: "300",
          color: "#767E93",
        }}
      >
        This is your seed phrase. Write it down on a paper and keep it in a safe
        place. You'll be asked to re-enter this phrase (in order) on the next
        step.
      </Text>
      <View
        style={{
          minWidth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "90%",
            gap: 15,
            padding: 20,
            backgroundColor: "#D7E4E3",
            borderRadius: 10,
            height: 300,
            minWidth: "90%",
          }}
        >
          {displaySeedPhrase ? (
            mnemonics.split(" ").map((word, index) => (
              <View
                key={index + 1}
                style={{
                  backgroundColor: "#ffffff",
                  width: 100,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {index + 1}. {word}
                </Text>
              </View>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Tap to reveal your seed phrase
              </Text>
              <Text>Make sure no one is watching your screen.</Text>
            </View>
          )}
        </View>
      </View>
      {displaySeedPhrase ? (
        <Pressable
          onPress={continueToWallet}
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
              color: "#F5FA80",
            }}
          >
            {showLoader ? (
              <ActivityIndicator
                animating={showLoader}
                size={"small"}
                color={"#F5FA80"}
              />
            ) : (
              "Continue"
            )}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => setDisplaySeedPhrase(!displaySeedPhrase)}
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
              color: "#F5FA80",
            }}
          >
            Reveal seed phrase
          </Text>
        </Pressable>
      )}
    </View>
  );
}
