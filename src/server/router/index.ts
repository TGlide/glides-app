// src/server/router/index.ts
import superjson from 'superjson';

import { createRouter } from './context';
import { presentationRouter } from './presentation';
import { slideRouter } from './slide';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('presentation.', presentationRouter)
	.merge('slide.', slideRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
