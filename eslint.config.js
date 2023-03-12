import sheriff from "eslint-config-sheriff"
import { defineFlatConfig } from "eslint-define-config";

const sheriffOptions = {
  "react": false,
  "lodash": true,
  "next": false,
  "playwright": false,
  "jest": false,
  "vitest": false
};

const config = defineFlatConfig([
  ...sheriff(sheriffOptions),
  {
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
]);

export default config;