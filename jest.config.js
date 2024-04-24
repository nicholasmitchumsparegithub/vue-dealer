module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue2-jest',
        '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    testEnvironment: 'jsdom'
};


