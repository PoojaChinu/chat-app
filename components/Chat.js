import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, background } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });

    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "You've entered the chat room",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
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
