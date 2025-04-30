export default {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    "transformIgnorePatterns": [
        "node_modules/(?!(isomorphic-fetch)/)"
      ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "^node-fetch$": "<rootDir>/node_modules/node-fetch"
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    
};

