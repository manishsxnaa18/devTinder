module.exports = {
  env: {
    node: true,        // Enable Node.js global variables
    es2021: true,      // Enable modern ECMAScript 2021 features
  },
  extends: [
    'eslint:recommended', // Use the recommended rules from ESLint
  ],
  parserOptions: {
    ecmaVersion: 12, // Supports ECMAScript 2021 (ES12) features
    sourceType: 'module', // Enable ES Modules (if you're using them)
  },
  rules: {
    'no-unused-vars': 'warn', // Warn when variables are declared but not used
    'no-console': 'warn', // Warn on the use of console.log (you can disable this if needed)
    'no-undef': 'error',  // Error when undefined variables are used
    'eqeqeq': ['error', 'always'], // Enforce strict equality (=== and !==)
  },
};