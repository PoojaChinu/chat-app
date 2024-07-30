import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const image = require("../img/BackgroundImage.png"); // Image background source
  const colors = ["#FFA07A", "#FFDAB9", "#DCDCDC", "#E6E6FA"];

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.welcomeText}>Welcome!</Text>

        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your username here"
          />
          <Text style={styles.chooseBackgroundColor}>
            Choose Background Color
          </Text>

          {/* Choose background color of chat \*/}
          <View style={styles.colorButtonsBox}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selected,
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>

          {/* Start Chat \*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name,
                background: background,
              })
            }
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    width: "88%",
    opacity: 50,
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#757083",
  },
  textDisplay: {
    height: 50,
    lineHeight: 50,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  chooseBackgroundColor: {
    flex: 1,
    fontSize: 18,
    fontWeight: "300",
    color: "#757083",
  },
  colorButtonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  selected: {
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#757083",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "700",
    color: "#ffffff",
    margin: 20,
  },
  box: {
    backgroundColor: "white",
    padding: 30,
    width: "88%",
    height: "44%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
});

export default Start;
