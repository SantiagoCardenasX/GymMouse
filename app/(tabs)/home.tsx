import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { auth, db } from "@/firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Don't stop when you're tired. Stop when you're done.",
  "Success starts with self-discipline.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
];

export default function HomeScreen() {
  const [quote, setQuote] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [presetWorkouts, setPresetWorkouts] = useState([]);
  const [todayWorkouts, setTodayWorkouts] = useState<any[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState<{ id: string; title: string }[]>([]);
  const confettiRef = useRef<any>(null);
  const [userData, setUserData] = useState<{name: string, email: string} | null>(null);

  const todayDate = new Date().toDateString();

  const isWorkoutCompleted =
    todayWorkouts.length > 0 &&
    completedWorkouts.length === todayWorkouts.length;

  useEffect(() => {
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);

    loadPresetWorkouts();
    loadGoals();
    checkResetDailyWorkouts();
  }, []);

  useEffect(() => {
    saveTodayWorkouts();
  }, [todayWorkouts, completedWorkouts]);

  useEffect(() => {
    if (isWorkoutCompleted && confettiRef.current) {
      confettiRef.current.start();
    }
  }, [isWorkoutCompleted]);

  useFocusEffect(
    useCallback(() => {
      loadPresetWorkouts();
    }, [])
  );

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
  
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        setUserData(doc.data() as {name: string, email: string});
      }
    });
  
    return () => unsubscribe();
  }, []);

  const loadPresetWorkouts = async () => {
    const saved = await AsyncStorage.getItem("workoutPresets");
    if (saved) {
      setPresetWorkouts(JSON.parse(saved));
    }
  };

  const saveTodayWorkouts = async () => {
    const data = {
      date: todayDate,
      workouts: todayWorkouts,
      completed: completedWorkouts,
    };
    await AsyncStorage.setItem("todayWorkouts", JSON.stringify(data));
  };

  const checkResetDailyWorkouts = async () => {
    const saved = await AsyncStorage.getItem("todayWorkouts");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === todayDate) {
        setTodayWorkouts(data.workouts || []);
        setCompletedWorkouts(data.completed || []);
      } else {
        setTodayWorkouts([]);
        setCompletedWorkouts([]);
        await AsyncStorage.removeItem("todayWorkouts");
      }
    }
  };

  // Fetch goals from Firestore
  const loadGoals = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "goals")
      );
      const goalsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setGoals(goalsData);
    } catch (error) {
      console.error("Error fetching goals:", error);
      Alert.alert("Error", "Failed to load goals");
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const goalsRef = collection(db, "users", user.uid, "goals");

    const unsubscribe = onSnapshot(goalsRef, (snapshot) => {
      const updatedGoals = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setGoals(updatedGoals);
    });

    return () => unsubscribe();
  }, []);

  const saveGoals = async () => {
    if (!goalInput.trim()) return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Authentication Required", "Please sign in to save goals");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "goals"), {
        title: goalInput.trim(),
      });
      setGoalInput("");
    } catch (error) {
      console.error("Error saving goal:", error);
      Alert.alert("Error", "Failed to save goal");
    }
  };

  const handleSelectWorkout = (index: number) => {
    if (selectedWorkouts.includes(index)) {
      setSelectedWorkouts(selectedWorkouts.filter((i) => i !== index));
    } else {
      setSelectedWorkouts([...selectedWorkouts, index]);
    }
  };

  const handleSaveTodayWorkouts = () => {
    if (selectedWorkouts.length === 0) {
      Alert.alert(
        "No Workouts Selected",
        "Please select at least one workout."
      );
      return;
    }
    const selected = selectedWorkouts.map((index) => presetWorkouts[index]);
    setTodayWorkouts(selected);
    setCompletedWorkouts([]);
    setSelectedWorkouts([]);
    setIsModalVisible(false);
  };

  const handleCompleteWorkout = (index: number) => {
    if (!completedWorkouts.includes(index)) {
      setCompletedWorkouts([...completedWorkouts, index]);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, "users", user.uid, "goals", goalId));
      loadGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={Platform.OS === "ios" ? 100 : 120}
    >
      {/* Confetti animation component */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          pointerEvents: "none",
        }}
      >
        <ConfettiCannon
          count={150}
          origin={{ x: -10, y: 0 }}
          autoStart={false}
          ref={confettiRef}
          fadeOut={true}
        />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.userIcon}
        />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.helloText}>Hello,</Text>
          <Text style={styles.welcomeText}>{userData?.name.toUpperCase() || auth.currentUser?.email}</Text>
        </View>
      </View>

      {/* Motivational Quote */}
      <View style={styles.quoteSection}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          style={styles.quoteBackground}
        />
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>

      {/* Daily Workout Section */}
      <View style={styles.goalSection}>
        <Text style={styles.goalTitle}>DAILY WORKOUT</Text>

        {todayWorkouts.length === 0 ? (
          <Text style={styles.noRoutinesText}>No workouts selected yet.</Text>
        ) : (
          todayWorkouts.map((workout, index) => (
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalText}>
                {workout.name} - {workout.sets} sets x {workout.reps} reps
              </Text>
              <TouchableOpacity
                onPress={() => handleCompleteWorkout(index)}
                style={{
                  backgroundColor: completedWorkouts.includes(index)
                    ? "#FF7B24"
                    : "#EBEBEB",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: completedWorkouts.includes(index)
                      ? "#fff"
                      : "#212121",
                  }}
                >
                  {completedWorkouts.includes(index) ? "Done" : "Complete"}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {todayWorkouts.length > 0 && (
          <Text style={styles.progressText}>
            {completedWorkouts.length}/{todayWorkouts.length} Completed
            {isWorkoutCompleted && " ✅"}
          </Text>
        )}

        <TouchableOpacity
          style={styles.setGoalButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.setGoalButtonText}>
            + Select Today's Workouts
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overall Goals Section */}
      <View style={styles.goalSection}>
        <Text style={styles.goalTitle}>YOUR GOALS</Text>

        {goals.map((goal) => (
          <View key={goal.id} style={styles.goalItem}>
            <Text style={styles.goalText}>{goal.title}</Text>
            <TouchableOpacity onPress={() => handleDeleteGoal(goal.id)}>
              <Text style={{ color: "#FF7B24", fontWeight: "bold" }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TextInput
          style={styles.inputGoalLarge}
          placeholder="Write your goal!"
          placeholderTextColor="#888"
          value={goalInput}
          onChangeText={setGoalInput}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.setGoalButton} onPress={saveGoals}>
          <Text style={styles.setGoalButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Modal: Select Workouts */}
      {isModalVisible && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select Workouts for Today</Text>
          {presetWorkouts.length === 0 ? (
            <Text style={styles.noRoutinesText}>
              No presets found. Add workouts in the Workouts page!
            </Text>
          ) : (
            presetWorkouts.map((workout: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.goalItem,
                  {
                    backgroundColor: selectedWorkouts.includes(index)
                      ? "#FF7B24"
                      : "#333333",
                  },
                ]}
                onPress={() => handleSelectWorkout(index)}
              >
                <Text style={styles.goalText}>
                  {workout.name} - {workout.sets} sets x {workout.reps} reps
                </Text>
              </TouchableOpacity>
            ))
          )}
          <View style={styles.modalActions}>
            <TouchableOpacity
              onPress={handleSaveTodayWorkouts}
              style={styles.addSetButton}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#212121",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userIcon: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  welcomeTextContainer: {
    marginLeft: 10,
  },
  helloText: {
    fontSize: 18,
    color: "gray",
    paddingLeft: 5,
  },
  welcomeText: {
    fontSize: 20,
    color: "#EBEBEB",
    paddingLeft: 5,
    fontWeight: "bold",
    
  },
  quoteSection: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#EBEBEB",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  quoteBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  goalSection: {
    marginTop: 40,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EBEBEB",
    marginBottom: 10,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalText: {
    color: "#EBEBEB",
    fontSize: 16,
  },
  progressText: {
    color: "#EBEBEB",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  setGoalButton: {
    backgroundColor: "#FF7B24",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  setGoalButtonText: {
    color: "#EBEBEB",
    fontSize: 16,
    fontWeight: "bold",
  },
  noRoutinesText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  modal: {
    position: "absolute",
    top: "40%",
    left: "5%",
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 10,
    zIndex: 10,
    width: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EBEBEB",
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addSetButton: {
    backgroundColor: "#FF7B24",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#EBEBEB",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "600",
  },
  inputGoalLarge: {
    backgroundColor: "#333333",
    color: "#EBEBEB",
    borderRadius: 10,
    padding: 15,
    textAlignVertical: "top",
    marginBottom: 10,
    fontSize: 16,
  },
});
