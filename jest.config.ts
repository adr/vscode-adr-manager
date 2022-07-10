// Sync object
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		// transform files with ts-jest
		"^.+\\.(js|ts)$": "ts-jest",
	},
	testPathIgnorePatterns: ["dist"],
	transformIgnorePatterns: ["node_modules/(?!antlr4)"],
	globals: {
		"ts-jest": {
			tsconfig: {
				// allow js in typescript
				allowJs: true,
			},
		},
	},
};
