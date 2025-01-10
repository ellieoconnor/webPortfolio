module.exports = {
	preset: 'jest-preset-angular',
	testEnvironment: 'jsdom',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/app.config.ts'],
	coveragePathIgnorePatterns: ['/node_modules/', 'src/main.ts', 'src/app.config.ts'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	},
	setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/dist/',
		'<rootDir>/src/main.ts',
		'<rootDir>/webpack.config.js',
		'<rootDir>/src/app.config.ts'
	],
	transform: {
		'^.+\\.(ts|mjs|js|html)$': [
			'jest-preset-angular',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
				stringifyContentPathRegex: '\\.html$'
			}
		]
	},
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
		'^src/(.*)$': '<rootDir>/src/$1'
	},
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
};
