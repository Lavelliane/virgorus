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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        serif: ['var(--font-jomhuria)', ...fontFamily.serif],
      },
      colors: {
        'virgorus-green' : '#6C7D47',
        'virgorus-cream' : '#F3EBE4',
        'virgorus-peach' : '#EE8665',
        'virgorus-brown' : '#432F2B',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
