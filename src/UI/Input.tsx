import React, { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

import { Label } from './Text';

type InputProps = {
	className?: string;
	value?: string;
	onChange?: HTMLInputElement['onchange'];
	type?: HTMLInputElement['type'];
	label?: string;
};

export const Input = forwardRef(function Input(
	{ label, onChange, ...props }: InputProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	return (
		<Wrapper>
			{label && <Label>{label}</Label>}
			<StyledInput ref={ref} {...props} />
		</Wrapper>
	);
});

const Wrapper = styled.div`
	> :not(:first-child) {
		margin-top: 0.5rem;
	}
`;

const StyledInput = styled.input<{
	fullWidth?: boolean;
}>`
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
