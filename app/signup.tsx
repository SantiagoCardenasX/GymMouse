import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function SignIn() {
  const router = useRouter();

  return (
    <Formik
  initialValues={{ email: '', password: '', confirmPassword: '' }}
  validationSchema={Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Required'),
  })}
  onSubmit={(values) => {
    console.log('Signing up:', values);
    router.replace('/(tabs)/home');
  }}
></Formik>
    );
    }