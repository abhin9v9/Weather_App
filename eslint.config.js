import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default {
  ignores: ['dist'], // Ignore the dist folder
  extends: [js.configs.recommended],
  files: ['**/*.{js,jsx}'], // Target JavaScript and JSX files
  languageOptions: {
    ecmaVersion: 2020, // Support ECMAScript 2020 features
    globals: globals.browser, // Include browser-specific globals
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules, // Apply recommended React Hooks rules
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }, // Warn if non-components are exported
    ],
  },
};
