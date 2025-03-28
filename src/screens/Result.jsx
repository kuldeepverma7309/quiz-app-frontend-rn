import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import React from 'react';
import QuestionResult from '../components/QuestionResult';
import { useNavigation } from '@react-navigation/native';

const Result = ({ route }) => {
    const navigation = useNavigation();
    const { topic, difficulty, numQuestions, questions } = route.params;
    const correctAnswers = questions.filter(q => q.selectedOption === q.correctOption).length;

    return (
        <ScrollView style={styles.container}>
            {/* Score Card */}
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreTitle}>Your Score</Text>
                <Text style={styles.scoreText}>{correctAnswers} / {numQuestions}</Text>
            </View>

            {/* Title & Info */}
            <Text style={styles.title}>Quiz Result</Text>
            <Text style={styles.subtitle}>📌 Topic: {topic}  |  🔥 Difficulty: {difficulty}</Text>

            {/* Questions & Answers */}
            {questions.map((q, index) => (
                <QuestionResult key={index} questionData={q} index={index} />
            ))}

            {/* Summary */}
            <Text style={styles.summary}>
                ✅ You answered {correctAnswers} out of {numQuestions} correctly!
            </Text>

            <TouchableHighlight onPress={() => navigation.navigate('Tabs')}
                style={styles.button}
                underlayColor="#0056b3"
            >
               <Text style={styles.buttonText}>Go Back to Home</Text>
            </TouchableHighlight>
        </ScrollView>
    );
};

export default Result;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    scoreContainer: {
        backgroundColor: '#007BFF',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    scoreTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    scoreText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    summary: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#007BFF',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
});
