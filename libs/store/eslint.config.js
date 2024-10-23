const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    "files": ["*.ts"],
    "extends": [
      "plugin:@nx/angular",
      "plugin:@angular-eslint/template/process-inline-templates"
    ],
    "rules": {
      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "learningUi",
          "style": "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "learning-ui",
          "style": "kebab-case"
        }
      ]
    }
  },
  {
    "files": ["*.html"],
    "extends": ["plugin:@nx/angular-template"],
    "rules": {}
  }
];
