import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
  const { userID } = route.params;
  const { name, background } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // navigation.setOptions({ title: name });
    // Create a query to get the "messages" collection from the Firestore database
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    // Subscribe to changes in the "messages" collection using onSnapshot.
    // This function will be called whenever there are changes in the collection.
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      // Initialize an empty array to store the new messages
      let newMessages = [];
      // Iterate through each document in the snapshot
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" || Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
        left: {
          backgroundColor: "#FFF",
        },
      }}
    />
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
