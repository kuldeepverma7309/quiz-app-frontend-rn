import React from 'react';
import { View, Text, Button } from 'react-native';
import SyntaxHighlighter from './SyntaxHighlighter'; // Apna custom highlighter

const QuestionCard = ({ questionData, onNext }) => {
    const codeMatch = questionData.question.match(/```javascript\n([\s\S]+?)\n```/);
    const codeSnippet = codeMatch ? codeMatch[1] : null;

    return (
        <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10, margin: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{questionData.question.replace(/```javascript\n[\s\S]+?\n```/, '')}</Text>

            {codeSnippet && <SyntaxHighlighter code={codeSnippet} />}

            {Object.entries(questionData.options).map(([key, value]) => (
                <Button key={key} title={`${key.toUpperCase()}: ${value}`} onPress={() => console.log(key)} />
            ))}

            <Button title="Next" onPress={onNext} />
        </View>
    );
};

export default QuestionCard;
