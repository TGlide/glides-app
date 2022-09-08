import styled from 'styled-components';

export const Heading = styled.h1`
	color: ${({ theme }) => theme.colors.primary};
	font-family: ${({ theme }) => theme.fonts.serif};
	font-size: 2rem;
	font-weight: 700;
`;

export const Body = styled.p`
	color: ${({ theme }) => theme.colors.primary};
	font-family: ${({ theme }) => theme.fonts.sans};
	font-size: 1rem;
	font-weight: 400;
`;

export const Meta = styled.p`
	font-family: ${({ theme }) => theme.fonts.sans};
	font-size: 0.875rem;
	font-weight: 400;
`;
