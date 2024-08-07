import { useState, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { userID } = route.params;
  const { name, background } = route.params;
  const [messages, setMessages] = useState([]);

  // Sends the newest message to Firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  useEffect(() => {
    let unsubMessages = null;

    navigation.setOptions({ title: name });

    if (isConnected) {
      if (unsubMessages) {
        unsubMessages();
      }

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // Subscribe to changes in the "messages" collection using onSnapshot.
      // This function will be called whenever there are changes in the collection.
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        // Initialize an empty array to store the new messages
        let newMessages = [];
        // Iterate through each document in the snapshot
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        });
      });
    } else {
      Alert.alert("Connection Lost!! Loading from cache.");

      loadCachedMessages();
    }

    // Clean up code
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  // Call this function if the isConnected prop turns out to be false in useEffect()
  const loadCachedMessages = async () => {
    // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn’t been set yet in AsyncStorage.
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#484848",
          },
          left: {
            backgroundColor: "#fff",
          },
        }}
      />
    );
  };
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  /* Render a View component with dynamic background color */
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  welcomeText: {
    color: "black",
    fontSize: 18,
    fontWeight: "300",
  },
});

export default Chat;
