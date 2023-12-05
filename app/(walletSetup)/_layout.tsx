import { Stack } from "expo-router";

export default function _Layout() {
  return (
    <Stack>
      <Stack.Screen name="walletSetup" options={{ headerShown: false }} />
      <Stack.Screen name="createPassword" options={{ headerShown: false }} />
      <Stack.Screen name="seedPhrase" options={{ headerShown: false }} />
      <Stack.Screen
        name="importSeedPhrase"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
