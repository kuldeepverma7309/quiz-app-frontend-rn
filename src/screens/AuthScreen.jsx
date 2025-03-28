import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { login, register } from '../services/action';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profession, setProfession] = useState('');

    const navigation = useNavigation();

    const handleAuth = () => {
        if (isLogin) {
            if (!email || !password) {
                Alert.alert("Error", "Please enter email and password.");
                return;
            }
            login({email, password}, navigation)
            navigation.navigate('Home');
        } else {
            if (!name || !email || !password || !profession) {
                Alert.alert("Error", "All fields are required.");
                return;
            }
            register({name, email, password, profession}, navigation)
            // Signup logic here
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

            {!isLogin && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        placeholderTextColor={theme.colors.inactiveTabColor}
                        value={name}
                        onChangeText={setName}
                    />
                    
                    <Picker
                        selectedValue={profession}
                        onValueChange={(itemValue) => setProfession(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Profession" value="" />
                        <Picker.Item label="Student" value="student" />
                        <Picker.Item label="Teacher" value="teacher" />
                        <Picker.Item label="Software Developer" value="developer" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </>
            )}

            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                placeholderTextColor={theme.colors.inactiveTabColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor={theme.colors.inactiveTabColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable style={styles.authButton} onPress={handleAuth}>
                <Text style={styles.authButtonText}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </Text>
            </Pressable>

            <Pressable onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </Text>
            </Pressable>
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        padding: 20,
    },
    title: {
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.colors.textColor,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: theme.colors.secondary,
        color: theme.colors.textColor,
    },
    picker: {
        width: '100%',
        height: 50,
        backgroundColor: theme.colors.secondary,
        borderWidth: 1,
        borderColor: theme.colors.accent,
        borderRadius: 8,
        marginBottom: 15,
        color: theme.colors.textColor,
    },
    authButton: {
        backgroundColor: theme.colors.buttonBackground,
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    authButtonText: {
        color: theme.colors.buttonText,
        fontSize: theme.fontSize.medium,
        fontWeight: 'bold',
    },
    switchText: {
        marginTop: 15,
        color: theme.colors.accent,
        fontSize: theme.fontSize.small,
    },
});
