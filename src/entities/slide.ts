/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';

import { Block, isBlock } from './blocks';

type SlideContent = {
	blocks: Block[];
};

export function isSlideContent(content: unknown): content is SlideContent {
	return (
		typeof content === 'object' &&
		content !== null &&
		Object.keys(content).includes('blocks') &&
		Array.isArray((content as any).blocks) &&
		(content as any).blocks.every((block: unknown) => isBlock(block))
	);
}

export function parseSlideContent(content: Prisma.JsonValue | undefined): SlideContent {
	const parsed = typeof content === 'string' ? JSON.parse(content) : content;

	if (isSlideContent(parsed)) {
		return parsed;
	}

	return {
		blocks: [],
	};
}
