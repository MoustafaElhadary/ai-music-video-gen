const {fontFamily} = require('tailwindcss/defaultTheme');

const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

const svgToDataUri = require('mini-svg-data-uri');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				boxShadow: {
					input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
				},
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			keyframes: {
				'accordion-down': {
					from: {height: 0},
					to: {height: 'var(--radix-accordion-content-height)'},
				},
				'accordion-up': {
					from: {height: 'var(--radix-accordion-content-height)'},
					to: {height: 0},
				},
				meteor: {
					'0%': {transform: 'rotate(215deg) translateX(0)', opacity: '1'},
					'70%': {opacity: '1'},
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: '0',
					},
				},
				spotlight: {
					'0%': {
						opacity: 0,
						transform: 'translate(-72%, -62%) scale(0.5)',
					},
					'100%': {
						opacity: 1,
						transform: 'translate(-50%,-40%) scale(1)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'meteor-effect': 'meteor 5s linear infinite',
				spotlight: 'spotlight 2s ease .75s 1 forwards',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		addVariablesForColors,
		function ({matchUtilities, theme}: any) {
			matchUtilities(
				{
					'bg-dot-thick': (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`,
						)}")`,
					}),
				},
				{
					values: flattenColorPalette(theme('backgroundColor')),
					type: 'color',
				},
			);
		},
	],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({addBase, theme}: any) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	);

	addBase({
		':root': newVars,
	});
}
