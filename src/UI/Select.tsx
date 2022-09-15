import React, { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

import { Label } from './Text';

type SelectProps = {
	className?: string;
	value?: string;
	onChange?: HTMLSelectElement['onchange'];
	children?: React.ReactNode;
	type?: HTMLSelectElement['type'];
	label?: string;
};

export const Select = forwardRef(function Select(
	{ label, onChange, ...props }: SelectProps,
	ref: ForwardedRef<HTMLSelectElement>,
) {
	return (
		<Wrapper>
			{label && <Label>{label}</Label>}
			<StyledSelect ref={ref} {...props}>
				{props.children}
			</StyledSelect>
		</Wrapper>
	);
});

const Wrapper = styled.div`
	> :not(:first-child) {
		margin-top: 0.5rem;
	}
`;

const StyledSelect = styled.select<{
	fullWidth?: boolean;
}>`
	background: ${({ theme }) => theme.colors.background};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.m};
	color: ${({ theme }) => theme.colors.primary};
	cursor: pointer;

	font-family: ${({ theme }) => theme.fonts.sans};

	padding: 0.5rem;
	width: 100%;

	transition: border ${({ theme }) => theme.transition.appearance};

	&:hover {
		border-color: ${({ theme }) => theme.colors.borderHover};
	}

	&:active {
		border-color: ${({ theme }) => theme.colors.borderActive};
	}
`;
