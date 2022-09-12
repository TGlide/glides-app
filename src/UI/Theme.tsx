import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { accentTheme, theme, ThemeObj } from 'styles/theme';

type ThemeVariant = 'default' | 'accent';

const themeMap: Record<ThemeVariant, ThemeObj> = {
	default: theme,
	accent: accentTheme
};

type ThemeProps = {
	variant?: ThemeVariant;
	children: React.ReactNode;
};

export const Theme = ({ variant: theme = 'default', children }: ThemeProps) => {
	const themeObj = themeMap[theme];

	return (
		<ThemeProvider theme={themeObj}>
			<Wrapper>{children}</Wrapper>
		</ThemeProvider>
	);
};

const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.primary};
`;
