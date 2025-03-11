import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProgressPage() {
  const [measurements, setMeasurements] = useState<{ title: string; value: string; date: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState({ title: '', value: '' });


  const handleAddMeasurement = () => {
    if (!newMeasurement.title || !newMeasurement.value) {
      Alert.alert('Error', 'Please fill in both title and value!');
      return;
    }
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const updatedMeasurements = [
      ...measurements,
      { title: newMeasurement.title, value: newMeasurement.value, date: currentDate }
    ];

    setMeasurements(updatedMeasurements);
    setNewMeasurement({ title: '', value: '' });
    setIsModalVisible(false);
  };

  // Function to group measurements by title
  const groupMeasurementsByTitle = (): { [key: string]: { title: string; value: string; date: string }[] } => {
    return measurements.reduce((acc: { [key: string]: { title: string; value: string; date: string }[] }, measurement) => {
      if (!acc[measurement.title]) {
        acc[measurement.title] = [];
      }
      acc[measurement.title].push(measurement);
      return acc;
    }, {});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>My Progress</Text>
      </View>

      {/* Measurement List */}
      <View style={styles.measurementsList}>
        {Object.entries(groupMeasurementsByTitle()).map(([title, measurementsGroup], index) => (
          <View key={index} style={styles.measurementGroup}>
            <Text style={styles.measurementTitle}>{title}</Text>
            {measurementsGroup.map((measurement, i) => (
              <View key={i} style={styles.measurementItem}>
                <Text style={styles.measurementText}>
                  {measurement.date} - {measurement.value}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Add Measurement Button */}
      <View style={styles.addButtonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <FontAwesome5 name="plus" size={20} color="white" />
      </TouchableOpacity>
      </View>

      {/* Modal for Adding Measurement */}
      {isModalVisible && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add a New Measurement</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Measurement Title (e.g., Bodyweight)"
            value={newMeasurement.title}
            onChangeText={(text) => setNewMeasurement({ ...newMeasurement, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Measurement Value (e.g., 152 lbs)"
            value={newMeasurement.value}
            onChangeText={(text) => setNewMeasurement({ ...newMeasurement, value: text })}
          />
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.addSetButton} onPress={handleAddMeasurement}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
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
  measurementsList: {
    marginVertical: 20,
  },
  measurementGroup: {
    marginBottom: 20,
  },
  measurementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7B24',
    marginBottom: 10,
  },
  measurementItem: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  measurementText: {
    color: '#EBEBEB',
    fontSize: 14,
  },

  addButtonContainer: {
    flex: 1,
    alignItems: 'center',
    },
    
  addButton: {
    backgroundColor: '#FF7B24',
    padding: 15,
    borderRadius: 50,
    // position: 'absolute',
    // bottom: 150,
    // right: 20,
    // justifyContent: 'center',
    alignItems: 'center',
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
