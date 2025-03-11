import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Don't stop when you're tired. Stop when you're done.",
  "Success starts with self-discipline.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
];

export default function HomeScreen() {
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [quote, setQuote] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Set a random quote when the component mounts
  useEffect(() => {
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []); // Empty dependency array ensures this only runs once


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Welcome Section */}
      <View style={styles.welcomeSection}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          style={styles.userIcon}
        />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.helloText}>Hello,</Text>
          <Text style={styles.welcomeText}>MICHEAL BERNADO</Text>
        </View>
      </View>

      {/* Motivational Quote Section */}
      <View style={styles.quoteSection}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          style={styles.quoteBackground}
        />
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>

      {/* Summarize Section */}
      <View style={styles.summariesSection}>
        <Text style={styles.summariesText}>SUMMARIZE</Text>
        <View style={styles.summariesContainer}>
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="walk" size={30} color="#FF7B24" />
            <Text style={styles.summaryValue}>3.234</Text>
            <Text style={styles.summaryLabel}>STEPS</Text>
          </View>
          <View style={styles.summaryItem}>
            <SimpleLineIcons name="fire" size={28} color="#FF7B24" />
            <Text style={styles.summaryValue}>2.323</Text>
            <Text style={styles.summaryLabel}>CALORIES</Text>
          </View>
          <View style={styles.summaryItem}>
            <IconSymbol name="heart" size={30} color="#FF7B24" />
            <Text style={styles.summaryValue}>10</Text>
            <Text style={styles.summaryLabel}>HOURS</Text>
          </View>
        </View>
      </View>

      {/* Fitness Goal Section */}
      <View style={styles.goalSection}>
        <Text style={styles.goalTitle}>YOUR FITNESS GOALS</Text>
        {/* <TextInput
          style={styles.input}
          placeholder="Work out 5 days a week"
          placeholderTextColor="#888"
          value={fitnessGoal}
          onChangeText={setFitnessGoal}
        /> */}
        <View style={styles.goalItem}>
          <Text style={styles.goalText}>Work out 5 days a week</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="circle-edit-outline"
              size={24}
              color="#FF7B24"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.goalItem}>
          <Text style={styles.goalText}>Swimming twice a week</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="circle-edit-outline"
              size={24}
              color="#FF7B24"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.setGoalButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.setGoalButtonText}>+ Set New Goal</Text>
        </TouchableOpacity>

        {isModalVisible && (
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>New Goal</Text>

            <TextInput
              style={styles.inputGoal}
              placeholder="Enter your goal"
              value={fitnessGoal}
              onChangeText={setFitnessGoal}
    
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.addSetButton}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 100,
  },
  welcomeSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  welcomeTextContainer: {
    marginLeft: 10,
  },

  welcomeText: {
    fontSize: 20,
    color: "#EBEBEB",
    paddingLeft: 5,
    fontWeight: "bold",
  },

  helloText: {
    fontSize: 18,
    color: "gray",
    paddingLeft: 5,
  },
  quoteSection: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#EBEBEB",
    textAlign: "center",
    paddingHorizontal: 20,
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
  // logo: {
  //   width: 100,
  //   height: 100,
  //   resizeMode: 'contain',
  //   alignSelf: 'center',
  //   marginBottom: 20,
  // },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#333333",
    borderRadius: 10,
    color: "#EBEBEB",
    paddingLeft: 15,
    fontSize: 16,
    marginTop: 10,
  },
  quoteBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  summariesSection: {
    marginTop: 40,
  },
  summariesText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EBEBEB",
    marginBottom: 10,
  },
  summariesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 15,
    margin: 5,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EBEBEB",
    paddingTop: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },

  setGoalButton: {
    backgroundColor: "#FF7B24",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  setGoalButtonText: {
    color: "#EBEBEB",
    fontSize: 16,
    fontWeight: "bold",
  },

  goalItem: {
    display: "flex",
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
  measurementsList: {
    marginVertical: 20,
  },
  measurementGroup: {
    marginBottom: 20,
  },
  measurementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF7B24",
    marginBottom: 10,
  },
  measurementItem: {
    backgroundColor: "#333333",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  measurementText: {
    color: "#EBEBEB",
    fontSize: 14,
  },

  addButtonContainer: {
    flex: 1,
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#FF7B24",
    padding: 15,
    borderRadius: 50,
    // position: 'absolute',
    // bottom: 150,
    // right: 20,
    // justifyContent: 'center',
    alignItems: "center",
  },
  modal: {
    position: "absolute",
    top: "15%",
    //bottom: "100%",
    //left: "10%",
    //right: "10%",
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
  },
  inputGoal: {
    height: 50,
    backgroundColor: '#444444',
    color: '#EBEBEB',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
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
});
