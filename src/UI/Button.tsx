import React from 'react';
import styled from 'styled-components';

import { theme } from 'styles/theme';
import { alpha } from 'utils/color';

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	iconLeft?: React.ReactNode;
	fullWidth?: boolean;
	className?: string;
	variant?: 'accent' | 'danger';
};

const getColors = (
	variant: ButtonProps['variant']
): {
	text: string;
	hover: string;
	active: string;
} => {
	switch (variant) {
		case 'danger':
			return {
				hover: alpha(theme.palette.red[40], 0.5),
				active: theme.palette.red[40],
				text: theme.palette.red[40]
			};
		default:
			return {
				hover: alpha(theme.palette.teal[30], 0.5),
				active: theme.palette.teal[30],
				text: theme.colors.primary
			};
	}
};

export const Button = ({ children, iconLeft, onClick, variant, ...props }: ButtonProps) => {
	return (
		<StyledButton onClick={onClick} colors={getColors(variant)} {...props}>
			{iconLeft && <IconLeft>{iconLeft}</IconLeft>}
			<span>{children}</span>
		</StyledButton>
	);
};

const StyledButton = styled.button<{ fullWidth?: boolean; colors: ReturnType<typeof getColors> }>`
	display: flex;
	align-items: center;
	justify-content: center;

	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.l};
	color: ${({ colors }) => colors.text};
	cursor: pointer;

	font-family: ${({ theme }) => theme.fonts.sans};

	padding: 1rem;
	width: ${(props) => (props.fullWidth ? '100%' : 'auto')};

	transition: border ${({ theme }) => theme.transition.appearance};

	&:hover {
		border-color: ${({ colors }) => colors.hover};
	}

	&:active {
		border-color: ${({ colors }) => colors.active};
	}
`;

const IconLeft = styled.div`
	display: grid;
	place-items: center;
	margin-right: 0.5rem;
`;
