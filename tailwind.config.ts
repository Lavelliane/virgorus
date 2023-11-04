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
        sans: ['var(--font-inter)', ...fontFamily.sans],
        efco: ['var(--font-efco)', ...fontFamily.serif],
        serif: ['var(--font-jomhuria)', ...fontFamily.serif],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  }
}

plugin: [
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
    },
  })
]

export default config
