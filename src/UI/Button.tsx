import React from 'react';
import styled from 'styled-components';

import { ThemeObj } from 'styles/theme';

type ButtonProps = {
	children?: React.ReactNode;
	onClick?: () => void;
	iconLeft?: React.ReactNode;
	fullWidth?: boolean;
	className?: string;
	variant?: 'accent' | 'danger' | 'accent';
	outline?: boolean;
	size?: 's' | 'm';
};

type Colors = {
	text: string;
	border: {
		default: string;
		hover: string;
		active: string;
	};
	background: {
		default: string;
		hover: string;
		active: string;
	};
};

const getColorsFactory = (variant: ButtonProps['variant'], outline: ButtonProps['outline']) => {
	return (theme: ThemeObj): Colors => {
		if (outline) {
			switch (variant) {
				case 'danger':
					return {
						border: {
							default: theme.colors.danger,
							hover: theme.colors.dangerDark,
							active: theme.colors.dangerDarker
						},
						text: theme.colors.danger,
						background: {
							default: 'transparent',
							hover: 'transparent',
							active: 'transparent'
						}
					};
				default:
					return {
						border: {
							default: theme.colors.border,
							hover: theme.colors.borderHover,
							active: theme.colors.borderActive
						},
						text: theme.colors.primary,
						background: {
							default: 'transparent',
							hover: 'transparent',
							active: 'transparent'
						}
					};
			}
		} else {
			switch (variant) {
				case 'danger':
					return {
						border: {
							default: theme.colors.danger,
							hover: theme.colors.dangerDark,
							active: theme.colors.dangerDarker
						},
						text: theme.colors.dangerForeground,
						background: {
							default: theme.colors.danger,
							hover: theme.colors.dangerDark,
							active: theme.colors.dangerDarker
						}
					};
				default:
					return {
						border: {
							default: theme.colors.border,
							hover: theme.colors.borderHover,
							active: theme.colors.borderActive
						},
						text: theme.colors.primary,
						background: {
							default: 'transparent',
							hover: 'transparent',
							active: 'transparent'
						}
					};
			}
		}
	};
};

export const Button = ({
	children,
	iconLeft,
	onClick,
	variant,
	outline,
	...props
}: ButtonProps) => {
	const getColors = getColorsFactory(variant, outline);

	// TODO: Add loading state
	return (
		<StyledButton onClick={onClick} getColors={getColors} {...props}>
			{iconLeft && <IconLeft>{iconLeft}</IconLeft>}
			{children && <span>{children}</span>}
		</StyledButton>
	);
};

const StyledButton = styled.button<{
	fullWidth?: boolean;
	getColors: ReturnType<typeof getColorsFactory>;
	size?: ButtonProps['size'];
	outline?: boolean;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	background-color: ${({ getColors, theme }) => getColors(theme).background.default};
	border: 1px solid ${({ getColors, theme }) => getColors(theme).border.default};
	border-radius: ${({ theme, size }) => (size === 's' ? theme.radii.m : theme.radii.l)};
	color: ${({ getColors, theme }) => getColors(theme).text};
	cursor: pointer;

	font-family: ${({ theme }) => theme.fonts.sans};

	padding: ${({ size }) => (size === 's' ? '0.75rem' : '1rem')};
	width: ${(props) => (props.fullWidth ? '100%' : 'auto')};

	transition: border ${({ theme }) => theme.transition.appearance};

	&:hover {
		background-color: ${({ getColors, theme }) => getColors(theme).background.hover};
		border-color: ${({ getColors, theme }) => getColors(theme).border.hover};
	}

	&:active {
		background-color: ${({ getColors, theme }) => getColors(theme).background.active};
		border-color: ${({ getColors, theme }) => getColors(theme).border.active};
	}
`;

const IconLeft = styled.div`
	display: grid;
	place-items: center;
`;
