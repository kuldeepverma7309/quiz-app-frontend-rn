import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSize } from '../theme.js';
import { storageContext } from '../context/storageContext';
import { generateQuiz } from '../services/action.js';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [numQuestions, setNumQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const {setQuestions, questions} = useContext(storageContext);

  const handleStartQuiz = async() => {
    try {
      if (!topic.trim()) return alert('Please enter a topic');
      setIsLoading(true);
     const q = await generateQuiz({ topic, difficulty, numQuestions })
      if (!q) return alert('No questions found for this topic');
      setQuestions(q); // ✅ Set questions in context
      navigation.replace('Quiz', { topic, difficulty, numQuestions });
    } catch (error) {
      ToastAndroid.show('Error fetching questions', ToastAndroid.SHORT);
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Quiz</Text>

      {/* Topic Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Topic (e.g., JavaScript)"
        placeholderTextColor={colors.inactiveTabColor}
        value={topic}
        onChangeText={setTopic}
      />

      {/* Difficulty Level Picker */}
      <Text style={styles.label}>Select Difficulty:</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      {/* Number of Questions Picker */}
      <Text style={styles.label}>Select Number of Questions:</Text>
      <Picker
        selectedValue={numQuestions}
        onValueChange={(itemValue) => setNumQuestions(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="5 Questions" value={5} />
        <Picker.Item label="10 Questions" value={10} />
        <Picker.Item label="15 Questions" value={15} />
        <Picker.Item label="20 Questions" value={20} />
      </Picker>

      {/* Start Quiz Button */}
      <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
        {
          isLoading ? (<ActivityIndicator size="small" color={colors.textColor} />) : (
            <Text style={styles.buttonText}>Start Quiz</Text>
          )
        }
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.large, // Using imported font size
    fontWeight: 'bold',
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.secondary,
    color: colors.textColor,
    fontSize: fontSize.medium, // Using imported font size
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    color: colors.textColor,
    fontSize: fontSize.medium, // Using imported font size
    marginTop: 10,
  },
  picker: {
    backgroundColor: colors.secondary,
    color: colors.textColor,
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors.accent,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.textColor,
    fontSize: fontSize.medium, // Using imported font size
    fontWeight: 'bold',
  },
});
