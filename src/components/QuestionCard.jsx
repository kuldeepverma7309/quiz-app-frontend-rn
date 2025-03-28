import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import SyntaxHighlighter from './SyntaxHighlighter';
import { colors, fontSize } from '../theme.js';

const QuestionCard = ({ questionData, onNext, onPrevious, onSkip, onSelect, selectedOption, currentIndex, totalQuestions }) => {
    const codeMatch = questionData.question.match(/```(javascript|java|python|c|cpp)\n([\s\S]+?)\n```/);
    const codeSnippet = codeMatch ? codeMatch[2] : null;

    return (
        <View style={styles.card}>
            <Text style={styles.questionText}>
                {questionData.question.replace(/```(javascript|java|python|c|cpp)\n[\s\S]+?\n```/, '')}
            </Text>

            {codeSnippet && <SyntaxHighlighter code={codeSnippet} />}

            {Object.entries(questionData.options).map(([key, value]) => (
                <Pressable
                    key={key}
                    style={[
                        styles.optionButton,
                        selectedOption === key && styles.selectedOption
                    ]}
                    onPress={() => onSelect(key)}
                >
                    <Text style={styles.optionText}>{`${key.toUpperCase()}: ${value}`}</Text>
                </Pressable>
            ))}

            {/* Buttons for Navigation */}
            <View style={styles.buttonContainer}>
                <Pressable 
                    style={[styles.navButton, currentIndex === 0 && styles.disabledButton]} 
                    onPress={onPrevious} 
                    disabled={currentIndex === 0}
                >
                    <Text style={styles.navText}>Previous</Text>
                </Pressable>

                <Pressable style={styles.skipButton} onPress={onSkip}>
                    <Text style={styles.navText}>Skip</Text>
                </Pressable>

                <Pressable 
                    style={[styles.navButton, currentIndex === totalQuestions - 1 && styles.disabledButton]} 
                    onPress={onNext} 
                    disabled={currentIndex === totalQuestions - 1}
                >
                    <Text style={styles.navText}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default QuestionCard;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: colors.secondary, // Theme background
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    questionText: {
        fontSize: fontSize.large, // Theme font size
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.textColor, // Theme text color
    },
    optionButton: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.buttonBackground, // Theme border color
        marginVertical: 5,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: colors.buttonBackground, // Theme active color
    },
    optionText: {
        fontSize: fontSize.medium, // Theme font size
        color: colors.textColor, // Theme text color
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    navButton: {
        flex: 1,
        backgroundColor: colors.buttonBackground, // Theme button color
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    skipButton: {
        flex: 1,
        backgroundColor: colors.warning, // Theme warning color
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: colors.inactiveTabColor, // Theme inactive button color
    },
    navText: {
        color: colors.buttonText, // Theme button text color
        fontSize: fontSize.medium,
        fontWeight: 'bold',
    },
});
