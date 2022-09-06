// src/server/router/index.ts
import superjson from 'superjson';

import { createRouter } from './context';
import { presentationRouter } from './presentation';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('presentation.', presentationRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
