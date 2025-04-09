import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "@/firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";


export default function SignUp() {
  const router = useRouter();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !confirmEmail || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (email !== confirmEmail) {
      setError("Emails do not match");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        email: email,
      });

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
        setError("Invalid email or password");
        break;
      case "auth/email-already-in-use":
        setError("Email already in use");
        break;
      case "auth/weak-password":
        setError("Password is too weak");
        break;
      default:
        setError("An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Email"
        placeholderTextColor="#999"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#212121",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FF7B24",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#FF7B24",
    textAlign: "center",
    marginTop: 16,
  },
  errorText: {
    color: "#ff5252",
    marginBottom: 16,
    textAlign: "center",
  },
});