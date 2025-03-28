import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useContext, useState } from 'react';
import { storageContext } from '../context/storageContext.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontSize } from '../theme.js';
import axios from 'axios';
import { BASE_URL } from '../constant.js';
import { storeResults } from '../services/action.js';

const Quiz = ({ route, navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { topic, difficulty, numQuestions } = route.params;
  const { questions } = useContext(storageContext);

  console.log("questions ", questions);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const nextQuestion = () => {
    if (selectedOption !== null) {
      questions[currentIndex] = { ...questions[currentIndex], selectedOption };
    }
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(questions[currentIndex - 1]?.selectedOption || null);
    }
  };

  const skipQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const submitHandler = async () => {
    const transformedData = {
      topic,
      difficulty,
      numQuestions,
      questions: questions.map((q) => ({
        question: q.question,
        correctOption: q.correctAnswer?.key,
        selectedOption: q.selectedOption || null,
      })),
    };
    await storeResults(transformedData);
    navigation.navigate('Result', transformedData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <QuestionCard
          questionData={questions[currentIndex]}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
          onSkip={skipQuestion}
          onSelect={handleOptionSelect}
          selectedOption={selectedOption}
          currentIndex={currentIndex}
          totalQuestions={numQuestions}
        />

        <Text style={styles.counterText}>
          Question {currentIndex + 1} of {numQuestions}
        </Text>

        {currentIndex === questions.length - 1 && (
          <Pressable style={styles.submitButton} onPress={submitHandler}>
            <Text style={styles.submitText}>You've completed the quiz! Submit</Text>
          </Pressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Theme color
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  counterText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: fontSize.medium, // Theme font size
    color: colors.textColor, // Theme text color
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.buttonBackground, // Theme button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  submitText: {
    textAlign: 'center',
    color: colors.buttonText, // Theme button text color
    fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
});
