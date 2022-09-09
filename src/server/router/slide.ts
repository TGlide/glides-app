import { z } from 'zod';

import { createRouter } from './context';

export const slideRouter = createRouter()
	.query('get', {
		input: z.object({
			id: z.string()
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.slide.findUnique({
				where: {
					id: input.id
				}
			});
		}
	})
	.mutation('create', {
		input: z.object({
			presentationId: z.string()
		}),
		async resolve({ ctx, input }) {
			await ctx.prisma.slide.create({
				data: {
					presentationId: input.presentationId
				}
			});
		}
	})
	.mutation('delete', {
		input: z.object({
			id: z.string()
		}),
		async resolve({ ctx, input }) {
			await ctx.prisma.slide.delete({
				where: {
					id: input.id
				}
			});
		}
	});
