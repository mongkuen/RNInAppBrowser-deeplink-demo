import * as React from "react";
import { View, Text, Pressable, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";
import * as ExpoLinking from "expo-linking";
import * as styles from "./styles";

const prefix = ExpoLinking.createURL("/");
const linking = {
  prefixes: [prefix],
};

const url = "http://localhost:3000";

const openLink = async () => {
  if (await InAppBrowser.isAvailable()) {
    await InAppBrowser.open(url, {});
  }
};

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ ...styles.text, marginBottom: "5%" }}>
        DeeplinkScreen should show after browser redirect closes
      </Text>
      <Text style={styles.text}>
        Correct behavior should: {"\n"}1. open browser {"\n"}2. prompts redirect
        {"\n"}3. yields control back to app {"\n"}4. shows DeepLinkScreen
      </Text>
      <Pressable style={styles.button} onPress={() => Linking.openURL(url)}>
        <Text style={styles.buttonText}>
          Correct behavior: (Open in Browser)
        </Text>
      </Pressable>
      <Text style={styles.text}>
        RN-InAppBrowser has incorrect behavior: {"\n"}1. opens RN-InAppBrowser{" "}
        {"\n"}2. does nothing {"\n"}3. On browser exit, navigates to
        DeepLinkScreen
      </Text>
      <Pressable style={styles.button} onPress={() => openLink()}>
        <Text style={styles.buttonText}>
          Incorrect behavior: (Open in RN-InAppBrowser)
        </Text>
      </Pressable>
    </View>
  );
}

function DeepLinkScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Deeplink Screen</Text>
      <Button
        title="Go back to Home Screen"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DeepLinkScreen" component={DeepLinkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
