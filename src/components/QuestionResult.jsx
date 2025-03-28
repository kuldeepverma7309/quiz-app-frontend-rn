import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const QuestionResult = ({ questionData, index }) => {
    const isCorrect = questionData.selectedOption === questionData.correctOption;

    return (
        <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{index + 1}. {questionData.question}</Text>

            <Text style={isCorrect ? styles.correctAnswer : styles.wrongAnswer}>
                Your Answer: {questionData.selectedOption ? questionData.selectedOption.toUpperCase() : "Not Attempted"}
            </Text>

            {!isCorrect && (
                <Text style={styles.correctAnswerText}>
                    Correct Answer: {questionData.correctOption.toUpperCase()} ({questionData.correctAnswerText})
                </Text>
            )}
        </View>
    );
};

export default QuestionResult;

const styles = StyleSheet.create({
    questionContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    correctAnswer: {
        color: 'green',
        fontWeight: 'bold',
    },
    wrongAnswer: {
        color: 'red',
        fontWeight: 'bold',
    },
    correctAnswerText: {
        color: 'blue',
        fontStyle: 'italic',
    },
});
