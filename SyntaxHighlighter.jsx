import React from 'react';
import { Text, View, ScrollView } from 'react-native';

// Syntax Highlighting Rules
const syntaxRules = [
  { regex: /\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|import|from|export|default|class|extends|super|new|try|catch|finally|throw|typeof|instanceof)\b/g, color: '#ff79c6' }, // Keywords
  { regex: /\/\/.*/g, color: '#6272a4' }, // Single-line comments
  { regex: /\/\*[\s\S]*?\*\//g, color: '#6272a4' }, // Multi-line comments
  { regex: /(["'`])(?:(?=(\\?))\2.)*?\1/g, color: '#f1fa8c' }, // Strings
  { regex: /\b\d+\b/g, color: '#bd93f9' }, // Numbers
  { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, color: '#ffb86c' }, // Boolean & special values
  { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, color: '#50fa7b' }, // Class names
  { regex: /(\(|\)|\{|\}|\[|\])/g, color: '#ff5555' }, // Brackets
  { regex: /(\+|\-|\*|\/|=|==|===|!=|!==|>|<|>=|<=|\|\||&&|!)/g, color: '#ffb86c' }, // Operators
];

// Function to apply syntax highlighting
const applySyntaxHighlighting = (code) => {
  let formattedCode = [{ text: code, color: '#f8f8f2' }];

  syntaxRules.forEach(({ regex, color }) => {
    formattedCode = formattedCode.flatMap(({ text, color: defaultColor }) =>
      text.split(regex).map((part, index) =>
        regex.test(part) ? { text: part, color } : { text: part, color: defaultColor }
      )
    );
  });

  return formattedCode;
};

// Main SyntaxHighlighter Component
const SyntaxHighlighter = ({ code }) => {
  const formattedCode = applySyntaxHighlighting(code);

  return (
    <ScrollView horizontal style={{ backgroundColor: '#282a36', padding: 10, borderRadius: 5 }}>
      <ScrollView>
        <Text style={{ fontFamily: 'monospace' }}>
          {formattedCode.map((part, index) => (
            <Text key={index} style={{ color: part.color }}>
              {part.text}
            </Text>
          ))}
        </Text>
      </ScrollView>
    </ScrollView>
  );
};

export default SyntaxHighlighter;
