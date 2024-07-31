// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "[2024-04-07T20:44:48.130Z]  @firebase/auth: Auth (10.3.1)",
]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
