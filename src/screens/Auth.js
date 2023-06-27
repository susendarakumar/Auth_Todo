import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

export default function App({ navigation }) {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    handleAuthentication();
  }, []);
  const handleAuthentication = async () => {
    const hasLocalAuth = await LocalAuthentication.hasHardwareAsync();
    if (!hasLocalAuth) {
      Alert.alert(
        "Fingerprint authentication is not available on this device."
      );
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("No fingerprint credentials found on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      Alert.alert("Authentication successful!");
      navigation.navigate("Todo");
    } else {
      Alert.alert("Authentication failed.");
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Authenticate with Fingerprint"
        onPress={handleAuthentication}
      />
    </View>
  );
}
