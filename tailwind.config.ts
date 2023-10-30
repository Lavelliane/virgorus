import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");
const {fontFamily} = require("tailwindcss/defaultTheme")

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
				chocolate: '#432F2B',
				nude: '#F3EBE4',
				coral: '#FF7F5C',
				olive: '#6C7D47',
			},
      fontFamily: {
        sans: ['var(--font-inter)'],
        efco: ['var(--font-efco)'],
        serif: ['var(--font-jomhuria)', ...fontFamily.serif],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  }
},

  plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: '#432F2B',
						},
						default: {
							DEFAULT: '#F3EBE4',
						},
					},
				},
			},
		}),
	],
}
export default config
