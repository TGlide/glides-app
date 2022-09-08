import { z } from 'zod';

import { createRouter } from './context';

export const presentationRouter = createRouter()
	.query('get', {
		input: z.object({
			id: z.string()
		}),
		resolve({ input }) {
			return {
				greeting: `Hello ${input?.id ?? 'world'}`
			};
		}
	})
	.query('getAll', {
		async resolve({ ctx }) {
			return await ctx.prisma.presentation.findMany();
		}
	})
	.mutation('create', {
		input: z.object({
			title: z.string()
		}),
		async resolve({ ctx, input }) {
			await ctx.prisma.presentation.create({
				data: {
					title: input.title
				}
			});
		}
	})
	.mutation('delete', {
		input: z.object({
			id: z.string()
		}),
		async resolve({ ctx, input }) {
			await ctx.prisma.presentation.delete({
				where: {
					id: input.id
				}
			});
		}
	});
