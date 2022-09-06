import styled from 'styled-components';

export const Heading = styled.h1`
	color: ${({ theme }) => theme.colors.primary};
	font-family: ${({ theme }) => theme.fonts.serif};
	font-size: 2rem;
	font-weight: 700;
`;
