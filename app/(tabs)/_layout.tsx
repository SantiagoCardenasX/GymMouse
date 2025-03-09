import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = '#212121';
  const textColor = '#EBEBEB';
  const activeColor = '#FF7B24';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: textColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: backgroundColor,
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 10,
            height: 100,
          },
          default: {
            backgroundColor: backgroundColor,
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 10,
            height: 100,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome5 name="home" size={size} color={color} />
              <Text style={[styles.tabLabel, { color }]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome5 name="dumbbell" size={size} color={color} />
              <Text style={[styles.tabLabel, { color }]}>Workouts</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Fontisto name="line-chart" size={size} color={color} />
              <Text style={[styles.tabLabel, { color }]}>Progress</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: 80,
    marginTop: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,

  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#212121',
  },
});
