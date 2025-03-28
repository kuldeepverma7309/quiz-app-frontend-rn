import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { storageContext } from "../context/storageContext";
import { colors } from "../theme";
import { BASE_URL } from "../constant";
import { logout, updateProfile } from "../services/action";

const Profile = () => {
  const { user, token, setUser } = useContext(storageContext);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const profile = await updateProfile({ ...updatedUser, password })
    console.log(profile)
    setUser(profile)
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={updatedUser.name}
        onChangeText={(text) => setUpdatedUser({ ...updatedUser, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={updatedUser.email}
        onChangeText={(text) => setUpdatedUser({ ...updatedUser, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Profession"
        value={updatedUser.profession}
        onChangeText={(text) => setUpdatedUser({ ...updatedUser, profession: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Updating..." : "Update Profile"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: { fontSize: 22, fontWeight: "bold", color: colors.primary, textAlign: "center", marginBottom: 20 },
  input: {
    backgroundColor: colors.inputBackground,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
  },
  button: { backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  logoutButton: { marginTop: 20, alignItems: "center" },
  logoutText: { color: "red", fontWeight: "bold", fontSize: 16 },
});

export default Profile;
