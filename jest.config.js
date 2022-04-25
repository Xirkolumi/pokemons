module.exports = {
    name: 'pokemons',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    modulePathIgnorePatterns: ["<rootDir>/src/environments", "<rootDir>/tests"]
  };
  