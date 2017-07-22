module.exports = {
    notify: true,
    transform: {
        '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json'
    ],
    moduleDirectories: ['node_modules', 'src'],
    globals: {
        'ts-jest': {
            useBabelrc: true
        }
    }
};
