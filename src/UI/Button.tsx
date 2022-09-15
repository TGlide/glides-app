import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';

type ButtonProps = {
	children?: React.ReactNode;
	onClick?: () => void;
	iconLeft?: React.ReactNode;
	fullWidth?: boolean;
	className?: string;
	variant: 'danger' | 'accent-outline' | 'danger-outline';
	size?: 's' | 'm';
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const Button = ({ children, iconLeft, onClick, variant, ...props }: ButtonProps) => {
	return (
		<StyledButton onClick={onClick} variant={variant} {...props}>
			{iconLeft && <IconLeft>{iconLeft}</IconLeft>}
			{children && <span>{children}</span>}
		</StyledButton>
	);
};

const StyledButton = styled('button')<{
	fullWidth?: boolean;
	size?: ButtonProps['size'];
	outline?: boolean;
	variant: ButtonProps['variant'];
}>(
	({ theme, fullWidth, size }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '0.5rem',
		backgroundColor: 'var(--background-default)',
		border: `1px solid var(--border-default)`,
		borderRadius: size === 's' ? theme.radii.m : theme.radii.l,
		color: 'var(--text)',
		cursor: 'pointer',

		fontFamily: theme.fonts.sans,

		padding: size === 's' ? '0.75rem' : '1rem',
		width: fullWidth ? '100%' : 'auto',

		transition: `border ${theme.transition.appearance}`,

		'&:hover': {
			backgroundColor: 'var(--background-hover)',
			borderColor: 'var(--border-hover)',
		},

		'&:active': {
			backgroundColor: 'var(--background-active)',
			borderColor: 'var(--border-active)',
		},
	}),
	({ theme }) =>
		variant({
			variants: {
				danger: {
					'--border-default': theme.colors.danger,
					'--border-hover': theme.colors.dangerDark,
					'--border-active': theme.colors.dangerDarker,
					'--text': theme.colors.dangerForeground,
					'--background-default': theme.colors.danger,
					'--background-hover': theme.colors.dangerDark,
					'--background-active': theme.colors.dangerDarker,
				},
				'accent-outline': {
					'--border-default': theme.colors.border,
					'--border-hover': theme.colors.borderHover,
					'--border-active': theme.colors.borderActive,
					'--text': theme.colors.primary,
				},
				'danger-outline': {
					'--border-default': theme.colors.danger,
					'--border-hover': theme.colors.dangerDark,
					'--border-active': theme.colors.dangerDarker,
					'--text': theme.colors.danger,
				},
			},
		}),
);

const IconLeft = styled.div`
	display: grid;
	place-items: center;
	width: 1rem;
	height: 1rem;

	& > svg {
		width: 100%;
		height: 100%;
	}
`;
