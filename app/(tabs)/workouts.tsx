import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';

export default function WorkoutsPage() {
  const [routines, setRoutines] = useState<{ name: string; sets: string; reps: string; weight: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRoutine, setNewRoutine] = useState({ name: '', sets: '', reps: '', weight: '' });

  const handleAddRoutine = () => {
    if (!newRoutine.name || !newRoutine.sets || !newRoutine.reps) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }
    setRoutines([...routines, newRoutine]);
    setNewRoutine({ name: '', sets: '', reps: '', weight: '' });
    setIsModalVisible(false);
  };

  const handleDeleteRoutine = (index: number) => {
    const updatedRoutines = routines.filter((_, idx) => idx !== index);
    setRoutines(updatedRoutines);
  };

  const handleEditRoutine = (index: number) => {
    const routine = routines[index];
    setNewRoutine(routine);
    setIsModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>My Workout Routines</Text>
      </View>

      <View style={styles.routinesList}>
        {routines.length === 0 ? (
          <Text style={styles.noRoutinesText}>No routines added yet.</Text>
        ) : (
          routines.map((routine, index) => (
            <View key={index} style={styles.routineItem}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <Text style={styles.routineDetails}>
                Sets: {routine.sets} | Reps: {routine.reps} | Weight: {routine.weight}
              </Text>
              <View style={styles.routineActions}>
                <TouchableOpacity onPress={() => handleEditRoutine(index)} style={styles.actionButton}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteRoutine(index)} style={styles.actionButton}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Make a new routine</Text>
      </TouchableOpacity>

      {isModalVisible && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add a New Routine</Text>
          <TextInput
            style={styles.input}
            placeholder="Workout Name"
            value={newRoutine.name}
            onChangeText={(text) => setNewRoutine({ ...newRoutine, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Sets"
            keyboardType="numeric"
            value={newRoutine.sets}
            onChangeText={(text) => setNewRoutine({ ...newRoutine, sets: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            keyboardType="numeric"
            value={newRoutine.reps}
            onChangeText={(text) => setNewRoutine({ ...newRoutine, reps: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (optional)"
            keyboardType="numeric"
            value={newRoutine.weight}
            onChangeText={(text) => setNewRoutine({ ...newRoutine, weight: text })}
          />
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={handleAddRoutine} style={styles.addSetButton}>
              <Text style={styles.buttonText}>Add Set</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
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
    flex: 1,
    backgroundColor: '#212121',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 100,
  },
  headerSection: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EBEBEB',
  },
  routinesList: {
    marginVertical: 20,
  },
  routineItem: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  routineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EBEBEB',
  },
  routineDetails: {
    fontSize: 14,
    color: '#EBEBEB',
  },
  routineActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#FF7B24',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  actionText: {
    color: '#fff',
  },
  noRoutinesText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FF7B24',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modal: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EBEBEB',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#444444',
    color: '#EBEBEB',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
  },
  modalActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addSetButton: {
    backgroundColor: '#FF7B24',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#EBEBEB',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '600',
  },
});
