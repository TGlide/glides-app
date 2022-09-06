import { z } from 'zod';

import { createRouter } from './context';

export const presentationRouter = createRouter()
	.query('hello', {
		input: z
			.object({
				text: z.string().nullish()
			})
			.nullish(),
		resolve({ input }) {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`
			};
		}
	})
	.query('getAll', {
		async resolve({ ctx }) {
			return await ctx.prisma.presentation.findMany();
		}
	})
	.mutation('create', {
		async resolve({ ctx }) {
			await ctx.prisma.presentation.create({
				data: {}
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
