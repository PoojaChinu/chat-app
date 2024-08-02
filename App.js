// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

LogBox.ignoreLogs([
  "[2024-04-07T20:44:48.130Z]  @firebase/auth: Auth (10.3.1)",
]);
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  // useEffect to display an alert popup if no internet connection
  useEffect(() => {
    if (connectionStatus.isConnected) {
      enableNetwork(db);
    } else {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBM4lyCMR8KfCxxQ33YOGyitk-O20Fimx0",
    authDomain: "chat-app-aeafe.firebaseapp.com",
    projectId: "chat-app-aeafe",
    storageBucket: "chat-app-aeafe.appspot.com",
    messagingSenderId: "783677333255",
    appId: "1:783677333255:web:4fb0075ac0f20f9fbd2fa2",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    // Create a stack navigator with initial route start
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
