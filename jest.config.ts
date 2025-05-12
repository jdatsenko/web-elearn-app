import type {Config} from 'jest';
const config: Config = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './testing/babel.config.js' }],
  },
  transformIgnorePatterns: ['node_modules/(?!your-esm-package/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', 
    '\\.css$': 'identity-obj-proxy', 
  },

  testEnvironment: 'jsdom',
  clearMocks: true,
  coverageProvider: "v8",

};

export default config;
