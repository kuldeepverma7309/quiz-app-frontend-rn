import React from 'react';
import { Text, View, ScrollView } from 'react-native';

// Syntax Highlighting Rules for Multiple Languages
const syntaxRules = [
  // Keywords (JS, Python, Java, C, C++)
  { regex: /\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|import|from|export|default|class|extends|super|new|try|catch|finally|throw|typeof|instanceof|async|await|static|this|yield)\b/g, color: '#ff79c6' },
  { regex: /\b(def|lambda|pass|global|nonlocal|with|as|assert|del|except|raise|yield|async|await|self|print)\b/g, color: '#ff79c6' }, // Python
  { regex: /\b(public|private|protected|static|final|abstract|synchronized|volatile|transient|throws|implements|interface|extends|enum)\b/g, color: '#ff79c6' }, // Java
  { regex: /\b(int|float|double|char|void|short|long|signed|unsigned|struct|typedef|union|goto)\b/g, color: '#ff79c6' }, // C, C++

  // Comments
  { regex: /\/\/.*/g, color: '#6272a4' }, // Single-line JS, Java, C, C++
  { regex: /\/\*[\s\S]*?\*\//g, color: '#6272a4' }, // Multi-line JS, Java, C, C++
  { regex: /#.*$/gm, color: '#6272a4' }, // Python single-line comment

  // Strings
  { regex: /(["'`])(?:(?=(\\?))\2.)*?\1/g, color: '#f1fa8c' },

  // Numbers
  { regex: /\b\d+\b/g, color: '#bd93f9' },

  // Boolean & Special Values
  { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, color: '#ffb86c' },

  // Class Names (Java, Python, JS)
  { regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, color: '#50fa7b' },

  // Function Names (C, C++, Java, Python, JS)
  { regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, color: '#61afef' },

  // Brackets & Symbols
  { regex: /(\(|\)|\{|\}|\[|\])/g, color: '#ff5555' },

  // Operators
  { regex: /(\+|\-|\*|\/|=|==|===|!=|!==|>|<|>=|<=|\|\||&&|!|&|\||\^|~|<<|>>)/g, color: '#ffb86c' },
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
