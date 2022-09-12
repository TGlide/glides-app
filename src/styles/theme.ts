import { alpha } from 'utils/color';

const palette = {
	teal: {
		10: 'hsla(182, 74%, 10%, 100%)',
		20: 'hsla(182, 74%, 20%, 100%)',
		30: 'hsla(182, 74%, 30%, 100%)',
		40: 'hsla(182, 74%, 40%, 100%)',
		50: 'hsla(182, 74%, 50%, 100%)',
		60: 'hsla(182, 74%, 60%, 100%)',
		70: 'hsla(182, 74%, 70%, 100%)',
		80: 'hsla(182, 74%, 80%, 100%)',
		90: 'hsla(182, 74%, 90%, 100%)',
		100: 'hsla(182, 74%, 100%, 100%)'
	},
	red: {
		0: 'hsla(0, 84%, 0%, 1)',
		10: 'hsla(0, 84%, 10%, 1)',
		20: 'hsla(0, 84%, 20%, 1)',
		30: 'hsla(0, 84%, 30%, 1)',
		40: 'hsla(0, 84%, 40%, 1)',
		45: 'hsla(0, 84%, 45%, 1)',
		50: 'hsla(0, 84%, 50%, 1)',
		60: 'hsla(0, 84%, 60%, 1)',
		70: 'hsla(0, 84%, 70%, 1)',
		80: 'hsla(0, 84%, 80%, 1)',
		90: 'hsla(0, 84%, 90%, 1)',
		100: 'hsla(0, 84%, 100%, 1)'
	},
	gray: {
		0: 'hsla(220, 47%, 0%, 1)',
		10: 'hsla(220, 47%, 10%, 1)',
		20: 'hsla(220, 47%, 20%, 1)',
		30: 'hsla(220, 47%, 30%, 1)',
		40: 'hsla(220, 47%, 40%, 1)',
		50: 'hsla(220, 47%, 50%, 1)',
		60: 'hsla(220, 47%, 60%, 1)',
		70: 'hsla(220, 47%, 70%, 1)',
		80: 'hsla(220, 47%, 80%, 1)',
		90: 'hsla(220, 47%, 90%, 1)',
		100: 'hsla(220, 47%, 100%, 1)'
	},
	white: 'hsla(0, 0%, 100%, 1)',
	black: 'hsla(0, 0%, 0%, 1)'
};

export const theme = {
	palette: { ...palette },
	colors: {
		background: palette.white,
		primary: palette.gray[10],
		secondary: alpha(palette.gray[10], 0.75),
		tertiary: alpha(palette.gray[10], 0.25),
		accent: palette.teal[30],
		accentDark: palette.teal[20],
		accentDarker: palette.teal[10],
		accentForeground: palette.white,
		danger: palette.red[45],
		dangerDark: palette.red[40],
		dangerDarker: palette.red[30],
		dangerForeground: palette.white,
		border: alpha(palette.gray[10], 0.25),
		borderHover: alpha(palette.teal[30], 0.5),
		borderActive: palette.teal[30]
	},
	fonts: {
		serif: '"Libre Baskerville", serif',
		sans: '"Manrope", sans-serif'
	},
	radii: {
		none: '0',
		s: '0.25rem',
		m: '0.5rem',
		l: '1rem',
		round: '50%',
		full: '9999px'
	},
	transition: {
		appearance: '200ms ease',
		motion: '300ms cubic-bezier(0.2, 1, 0.2, 1)',
		smooth: '400ms cubic-bezier(0.9, 0, 0.05, 1)',
		inOut: '300ms ease-in-out'
	}
};

export const accentTheme = {
	...theme,
	colors: {
		...theme.colors,
		background: palette.teal[30],
		primary: palette.white,
		border: alpha(palette.white, 0.5),
		accent: palette.white,
		accentForeground: palette.teal[30],
		danger: palette.white,
		dangerDark: alpha(palette.white, 0.95),
		dangerDarker: alpha(palette.white, 0.9),
		dangerForeground: palette.red[40]
	}
};

export type ThemeObj = typeof theme;
