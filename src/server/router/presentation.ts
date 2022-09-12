import { z } from 'zod';

import { createRouter } from './context';

export const presentationRouter = createRouter()
	.query('get', {
		input: z.object({
			id: z.string()
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.presentation.findUnique({
				where: {
					id: input.id
				},
				include: {
					slides: true
				}
			});
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
	.mutation('update', {
		input: z.object({
			id: z.string(),
			title: z.string()
		}),
		async resolve({ ctx, input }) {
			await ctx.prisma.presentation.update({
				where: {
					id: input.id
				},
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
