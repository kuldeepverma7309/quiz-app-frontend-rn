import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constant";
import { ToastAndroid } from "react-native";
import { storageContext } from "../context/storageContext";
import { useContext } from "react";


const API_URL = BASE_URL; // Change this to your backend URL

export const register = async (userData, navigation) => {
  try {
    const {data} = await axios.post(`${API_URL}/user/register`, userData);
    if(data.success) {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      navigation.replace("Home");
    }
  } catch (error) {
    throw error.response?.data || { success: false, message: "Registration failed" };
  }
};

export const login = async (credentials, navigation) => {
  try {
    const {data} = await axios.post(`${API_URL}/user/login`, credentials);
    if(data.success) {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      navigation.replace("Tabs");
    }
  } catch (error) {
    throw error.response?.data || { success: false, message: "Login failed" };
  }
};

export const logout = async (navigation) => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    navigation.replace("Login");
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    return { success: false, message: "Logout failed" };
  }
};

export const getProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return { success: false, message: "Unauthorized" };

    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: "Failed to fetch profile" };
  }
};

export const storeResults = async (transformedData)=>{
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return { success: false, message: "Unauthorized" };
        const {data} = await axios.post(`${API_URL}/quiz/store-quiz`, transformedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if(data.success) {
            ToastAndroid.show("Results stored successfully", ToastAndroid.SHORT);
        }
    } catch (error) {
        console.log(error);
        ToastAndroid.show("Failed to store results", ToastAndroid.SHORT);
    }
}

export const generateQuiz = async (payload) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return { success: false, message: "Unauthorized" };
    const response = await axios.post(`${API_URL}/quiz/generate-quiz`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      const { questions } = response.data;
      return questions; // ✅ Return questions
    } else {
      ToastAndroid.show("Failed to generate quiz", ToastAndroid.SHORT);
      return null; // ✅ Return null if failed
    }
  } catch (error) {
    ToastAndroid.show("Error generating quiz", ToastAndroid.SHORT);
    return null; // ✅ Return null on error
    console.error(error);
  }
}

export const updateProfile = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return { success: false, message: "Unauthorized" };
    const response = await axios.put(`${API_URL}/user/update`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      ToastAndroid.show("Profile updated successfully", ToastAndroid.SHORT);
      return response.data.user; // ✅ Return updated user data
    } else {
      ToastAndroid.show("Failed to update profile", ToastAndroid.SHORT);
      return null; // ✅ Return null if failed
    }
  } catch (error) {
    ToastAndroid.show("Error updating profile", ToastAndroid.SHORT);
    console.error(error);
    return null; // ✅ Return null on error
  }
}