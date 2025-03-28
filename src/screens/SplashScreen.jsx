import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme.js';
import { storageContext } from '../context/storageContext.jsx';

const SplashScreen = () => {
  const {isAuthenticated} = useContext(storageContext);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Check authentication status
    const checkAuthStatus =  () => {
      if(isAuthenticated) {
        navigation.replace('Tabs'); // Navigate to Home if authenticated
      }
      else {
        navigation.replace('AuthScreen'); // Navigate to Auth if not authenticated
      }
    };

    const timer = setTimeout(checkAuthStatus, 2000); // Delay for splash effect

    return () => clearTimeout(timer); // Cleanup
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
        Quiz Master 🔥
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent, // Vibrant accent color
  },
});
