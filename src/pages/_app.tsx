import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { ThemeProvider } from 'styled-components';
import superjson from 'superjson';

import { AppRouter } from 'server/router';
import { GlobalStyle } from 'styles/global';
import { theme } from 'styles/theme';

// Fonts
import '@fontsource/libre-baskerville';
import '@fontsource/libre-baskerville/700.css';
import '@fontsource/manrope';

const App: AppType = ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Component {...pageProps} />
		</ThemeProvider>
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
						(opts.direction === 'down' && opts.result instanceof Error)
				}),
				httpBatchLink({ url })
			],
			url,
			transformer: superjson
		};
	},
	ssr: false
})(App);
