import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import fetchInstance from "../../utils/fetchInstance";
import profile from "../../assets/images/man.png";

const Step1 = ({ setStep, setUserInfo }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getInfo = () => {
    setUserInfo({ username, email, password });
    setStep(2);
  };

  return (
    <View style={signUpStyling.subContainer}>
      <TextInput
        style={signUpStyling.input}
        placeholder="User Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={signUpStyling.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={signUpStyling.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={signUpStyling.button} onPress={getInfo}>
        <Text style={signUpStyling.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={signUpStyling.text}>
        I already have an account{" "}
        <Link style={signUpStyling.linkText} href="/login">
          {" "}
          Login
        </Link>
      </Text>
    </View>
  );
};

const Step2 = ({ setStep, setUserInfo }) => {
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getInfo = () => {
    setUserInfo((prevState) => ({
      ...prevState,
      address,
      fullName,
      phoneNumber,
    }));
    setStep(3);
  };

  return (
    <View style={signUpStyling.subContainer}>
      <TextInput
        style={signUpStyling.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={signUpStyling.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={signUpStyling.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TouchableOpacity style={signUpStyling.button} onPress={getInfo}>
        <Text style={signUpStyling.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const Step3 = ({ userInfo }) => {
  const router = useRouter();
  const [avatarSource, setAvatarSource] = useState(null);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setAvatarSource({ uri: result.assets[0].uri });
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileContent;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };
  const handleSignUp = async () => {
    const base64Image = await convertImageToBase64(avatarSource.uri ?? profile);

    if (base64Image) {
      try {
        const response = await fetchInstance("/users/add", {
          method: "POST",
          body: JSON.stringify({
            ...userInfo,
            profileImage: "data:image/png;base64," + base64Image,
          }),
        });
        if (response) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };
  return (
    <View style={signUpStyling.subContainer}>
      <TouchableOpacity onPress={handleImagePicker}>
        <Image
          style={signUpStyling.avatar}
          source={avatarSource || require("../../assets/images/man.png")}
        />
      </TouchableOpacity>
      <Text style={signUpStyling.text} children={userInfo?.full_name} />
      <TouchableOpacity
        style={signUpStyling.button}
        onPress={() => handleSignUp()}
      >
        <Text style={signUpStyling.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({});

  return (
    <View style={signUpStyling.container}>
      {step == 1 ? (
        <Step1 setStep={setStep} setUserInfo={setUserInfo} />
      ) : step == 2 ? (
        <Step2 setStep={setStep} setUserInfo={setUserInfo} />
      ) : (
        <Step3 userInfo={userInfo} />
      )}
    </View>
  );
};

export default SignUp;

const signUpStyling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  subContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    width: "80%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
  },
  avatar: {
    marginTop: 16,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  text: {
    marginTop: 16,
    textAlign: "center",
  },
  linkText: {
    color: "#3498db",
  },
});
