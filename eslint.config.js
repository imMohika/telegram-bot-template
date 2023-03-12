const sheriff = require('eslint-config-sheriff');
const { defineFlatConfig } = require('eslint-define-config');

const sheriffOptions = {
  "react": false,
  "lodash": true,
  "next": false,
  "playwright": false,
  "jest": false,
  "vitest": false
};

module.exports = defineFlatConfig([
  ...sheriff(sheriffOptions),
  {
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
]);