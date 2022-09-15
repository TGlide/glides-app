import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import superjson from 'superjson';

import { Theme } from 'UI/Theme';
import { AppRouter } from 'server/router';
import { GlobalStyle } from 'styles/global';
import { theme } from 'styles/theme';

// Fonts
import '@fontsource/libre-baskerville';
import '@fontsource/libre-baskerville/700.css';
import '@fontsource/manrope';
import '@fontsource/manrope/500.css';

const App: AppType = ({ Component, pageProps }) => {
	return (
		<Theme variant="default">
			<GlobalStyle />
			<PageWrapper>
				<Component {...pageProps} />
			</PageWrapper>
		</Theme>
	);
};

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return ''; // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
	config() {
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({ url }),
			],
			url,
			transformer: superjson,
		};
	},
	ssr: false,
})(App);

const PageWrapper = styled.div`
	min-height: 100vh;
`;
