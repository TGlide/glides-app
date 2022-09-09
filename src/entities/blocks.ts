/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, fields } from './fields';

// Base
type BlockRegister<F extends Record<string, Field>> = {
	name: string;
	fields: F;
};

type ExtractBlock<R extends BlockRegister<any>> = {
	name: R['name'];
	fields: {
		[K in keyof R['fields']]: R['fields'][K]['return_type'];
	} & {
		[key: string]: any;
	};
};

function registerBlock<F extends Record<string, Field>>(name: string, fields: F): BlockRegister<F> {
	return {
		name,
		fields
	};
}

// Blocks
const TextBlockRegister = registerBlock('text', {
	text: fields.text,
	fontSize: fields.number
});

export type TextBlock = ExtractBlock<typeof TextBlockRegister>;

const IconBlockRegister = registerBlock('icon', {
	icon: fields.icon,
	color: fields.color
});

export type IconBlock = ExtractBlock<typeof IconBlockRegister>;

export type Block = TextBlock | IconBlock;

export function isBlock(block: unknown): block is Block {
	return (
		typeof block === 'object' &&
		block !== null &&
		Object.keys(block).includes('name') &&
		typeof (block as any).name === 'string' &&
		Object.keys(block).includes('fields') &&
		typeof (block as any).fields === 'object' &&
		(block as any).fields !== null
	);
}

export const blocks = {
	TextBlockRegister,
	IconBlockRegister
};
