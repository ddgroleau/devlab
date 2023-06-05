const nextJest = require("next/jest");
const createJestConfig = nextJest({
    dir: "./",
});
const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
    collectCoverageFrom: [
        "<rootDir>/components/*",
        "<rootDir>/hooks/*",
        "<rootDir>/models/*",
        "<rootDir>/utils/*",
        "<rootDir>/context/*",
        "<rootDir>/api/*",
        "<rootDir>/app/*",
    ],
    setupFilesAfterEnv: [
        "<rootDir>/setupTests.ts"
    ]

};
module.exports = createJestConfig(customJestConfig);