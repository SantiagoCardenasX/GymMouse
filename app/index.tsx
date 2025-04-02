import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/(tabs)/home");
    } catch (error) {
      if (error instanceof Error) {
        handleAuthError((error as any).code);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (errorCode: any) => {
    switch (errorCode) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        setError("Invalid email or password");
        break;
      case "auth/user-not-found":
        setError("No account found with this email");
        break;
      case "auth/email-already-in-use":
        setError("Email already in use");
        break;
      case "auth/weak-password":
        setError("Password should be at least 6 characters");
        break;
      case "auth/invalid-email":
        setError("Invalid email address");
        break;
      default:
        setError("Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome to Gym Mouse</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={() => handleAuth()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#EBEBEB" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonSignUp, loading && styles.disabledButton]}
          onPress={() => router.push("/signup")}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#EBEBEB" />
          ) : (
            <Text style={styles.buttonSignUpText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#EBEBEB",
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: 400,
    height: 50,
    backgroundColor: "#333333",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#EBEBEB",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FF7B24",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonSignUp: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#333333",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#EBEBEB",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSignUpText: {
    color: "#EBEBEB",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  errorText: {
    color: "#ff5252",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
