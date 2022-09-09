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
		50: 'hsla(0, 84%, 50%, 1)',
		60: 'hsla(0, 84%, 60%, 1)',
		70: 'hsla(0, 84%, 70%, 1)',
		80: 'hsla(0, 84%, 80%, 1)',
		90: 'hsla(0, 84%, 90%, 1)',
		100: 'hsla(0, 84%, 100%, 1)'
	}
};

export const theme = {
	palette: { ...palette },
	colors: {
		background: 'hsla(0, 0%, 100%, 1)',
		primary: 'hsla(238, 100%, 5%, 1)',
		secondary: 'hsla(238, 100%, 5%, 0.75)',
		tertiary: 'hsla(238, 100%, 5%, 0.25)',
		accent: palette.teal[20],
		border: 'hsla(238, 100%, 5%, 0.25)',
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
