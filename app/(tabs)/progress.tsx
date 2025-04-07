import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProgressPage() {
  const [measurements, setMeasurements] = useState<{ title: string; value: string; date: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState({ title: '', value: '' });
  const [isTitleEditable, setIsTitleEditable] = useState(true);

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
    setIsTitleEditable(true); 
  };

  // Group measurements by title
  const groupMeasurementsByTitle = (): { [key: string]: { title: string; value: string; date: string }[] } => {
    return measurements.reduce((acc: { [key: string]: { title: string; value: string; date: string }[] }, measurement) => {
      if (!acc[measurement.title]) {
        acc[measurement.title] = [];
      }
      acc[measurement.title].push(measurement);
      return acc;
    }, {});
  };

  const openModalForNewTitle = () => {
    setIsTitleEditable(true);
    setNewMeasurement({ title: '', value: '' });
    setIsModalVisible(true);
  };

  const openModalForExistingTitle = (title: string) => {
    setIsTitleEditable(false);
    setNewMeasurement({ title, value: '' });
    setIsModalVisible(true);
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
            <View style={styles.titleRow}>
              <Text style={styles.measurementTitle}>{title}</Text>
              <TouchableOpacity onPress={() => openModalForExistingTitle(title)} style={styles.smallAddButton}>
                <FontAwesome5 name="plus" size={12} color="white" />
              </TouchableOpacity>
            </View>
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

      {/* Add New Measurement Title */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={openModalForNewTitle}>
          <FontAwesome5 name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      {isModalVisible && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add a New Measurement</Text>

          <TextInput
            style={[styles.input, !isTitleEditable && styles.disabledInput]}
            placeholder="Measurement Title (e.g., Bodyweight)"
            value={newMeasurement.title}
            editable={isTitleEditable}
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
            <TouchableOpacity style={styles.cancelButton} onPress={() => { setIsModalVisible(false); setIsTitleEditable(true); }}>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  measurementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7B24',
    marginRight: 10,
  },
  smallAddButton: {
    backgroundColor: '#FF7B24',
    padding: 5,
    borderRadius: 5,
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
  disabledInput: {
    backgroundColor: '#555555',
    color: '#BBBBBB',
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
