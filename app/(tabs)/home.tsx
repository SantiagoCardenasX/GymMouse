import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Don't stop when you're tired. Stop when you're done.",
  "Success starts with self-discipline.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Your body can stand almost anything. It’s your mind that you have to convince."
];

export default function HomeScreen() {
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [quote, setQuote] = useState('');

  // Set a random quote when the component mounts
  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []); // Empty dependency array ensures this only runs once

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome, username!</Text>
      </View>

      {/* Motivational Quote Section */}
      <View style={styles.quoteSection}>
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>

      {/* Fitness Goal Section */}
      <View style={styles.goalSection}>
        <Text style={styles.goalTitle}>Set your fitness goal:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your goal here... (e.g., 'Lose 10 lbs,' 'Work out 5 days a week')"
          placeholderTextColor="#888"
          value={fitnessGoal}
          onChangeText={setFitnessGoal}
        />
      </View>
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
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EBEBEB',
  },
  quoteSection: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#EBEBEB',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  goalSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EBEBEB',
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#333333',
    borderRadius: 10,
    color: '#EBEBEB',
    paddingLeft: 15,
    fontSize: 16,
    marginTop: 10,
  },
});
