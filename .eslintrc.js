module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "commonjs",
  },
  rules: {
    "no-console": "off", // Allow console.log in Node.js development
    "no-underscore-dangle": "off", // Allow _id from MongoDB
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }], // Ignore unused 'next' parameter in Express middleware
  },
};
