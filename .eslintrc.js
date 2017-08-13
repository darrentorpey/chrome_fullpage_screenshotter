module.exports = {
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest/globals": true,
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true,
    },
    "sourceType": "module"
  },
  plugins: [
    'prettier',
    'react',
    'jest',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        semi: false,
      },
    ],
    'react/jsx-uses-vars': 'error',
    'no-unused-vars': [1, {"vars": "all", "varsIgnorePattern": "React"}],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'warn',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error'
  },
}
