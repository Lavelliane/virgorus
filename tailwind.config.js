/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				chocolate: '#432F2B',
				nude: '#F3EBE4',
				nuder: '#EBDED2',
				coral: '#FF7F5C',
				olive: '#6C7D47',
			},
			fontFamily: {
				sans: ['var(--font-inter)'],
				efco: ['var(--font-efco)'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						default: {
							DEFAULT: '#FFFFFF',
						},
						primary: {
							DEFAULT: '#F3EBE4',
						},
						secondary: {
							DEFAULT: '#432F2B',
						},
						success: {
							DEFAULT: '#6C7D47',
						},
						warning: {
							DEFAULT: '#FF7F5C',
						},
					},
				},
				dark: {
					colors: {
						default: {
							DEFAULT: '#FFFFFF',
						},
						primary: {
							DEFAULT: '#F3EBE4',
						},
						secondary: {
							DEFAULT: '#432F2B',
						},
						success: {
							DEFAULT: '#6C7D47',
						},
						warning: {
							DEFAULT: '#FF7F5C',
						},
					},
				},

			},
		}),
	],
};
