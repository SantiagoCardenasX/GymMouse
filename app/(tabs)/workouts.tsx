import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutsPage() {
  const [routines, setRoutines] = useState<
    { name: string; sets: string; reps: string; weight: string }[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadRoutines();
  }, []);

  useEffect(() => {
    saveRoutines();
  }, [routines]);

  const loadRoutines = async () => {
    const saved = await AsyncStorage.getItem("workoutPresets");
    if (saved) setRoutines(JSON.parse(saved));
  };

  const saveRoutines = async () => {
    await AsyncStorage.setItem("workoutPresets", JSON.stringify(routines));
  };

  const handleAddRoutine = () => {
    if (!newRoutine.name || !newRoutine.sets || !newRoutine.reps) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...routines];
      updated[editingIndex] = newRoutine;
      setRoutines(updated);
      setEditingIndex(null);
    } else {
      setRoutines([...routines, newRoutine]);
    }

    setNewRoutine({ name: "", sets: "", reps: "", weight: "" });
    setIsModalVisible(false);
  };

  const handleDeleteRoutine = (index: number) => {
    const updated = routines.filter((_, idx) => idx !== index);
    setRoutines(updated);
  };

  const handleEditRoutine = (index: number) => {
    const routine = routines[index];
    setNewRoutine(routine);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>Workout Presets</Text>
      </View>

      {/* Routine List */}
      <View style={styles.routinesList}>
        {routines.length === 0 ? (
          <Text style={styles.noRoutinesText}>No routines added yet.</Text>
        ) : (
          routines.map((routine, index) => (
            <View key={index} style={styles.routineItem}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <Text style={styles.routineDetails}>
                Sets: {routine.sets} | Reps: {routine.reps} | Weight:{" "}
                {routine.weight}
              </Text>
              <View style={styles.routineActions}>
                <TouchableOpacity
                  onPress={() => handleEditRoutine(index)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteRoutine(index)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Add New Routine Button */}
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
          setEditingIndex(null);
          setNewRoutine({ name: "", sets: "", reps: "", weight: "" });
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>New Routine</Text>
      </TouchableOpacity>

      {/* Modal */}
      {isModalVisible && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>
            {editingIndex !== null ? "Edit Routine" : "Add a New Routine"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Workout Name"
            placeholderTextColor="#888"
            value={newRoutine.name}
            onChangeText={(text) =>
              setNewRoutine({ ...newRoutine, name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Sets"
            keyboardType="numeric"
            placeholderTextColor="#888"
            value={newRoutine.sets}
            onChangeText={(text) =>
              setNewRoutine({ ...newRoutine, sets: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            keyboardType="numeric"
            placeholderTextColor="#888"
            value={newRoutine.reps}
            onChangeText={(text) =>
              setNewRoutine({ ...newRoutine, reps: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (optional)"
            keyboardType="numeric"
            placeholderTextColor="#888"
            value={newRoutine.weight}
            onChangeText={(text) =>
              setNewRoutine({ ...newRoutine, weight: text })
            }
          />
          <View style={styles.modalActions}>
            <TouchableOpacity
              onPress={handleAddRoutine}
              style={styles.addSetButton}
            >
              <Text style={styles.buttonText}>
                {editingIndex !== null ? "Save Changes" : "Add"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                setEditingIndex(null);
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#212121",
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
  },
  headerSection: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EBEBEB",
  },
  routinesList: {
    marginVertical: 20,
  },
  routineItem: {
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  routineName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EBEBEB",
    marginBottom: 5,
  },
  routineDetails: {
    fontSize: 14,
    color: "#EBEBEB",
    marginBottom: 10,
  },
  routineActions: {
    flexDirection: "row",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#FF7B24",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
  noRoutinesText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#FF7B24",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    top: "25%",
    left: "10%",
    right: "10%",
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EBEBEB",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#444444",
    color: "#EBEBEB",
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
