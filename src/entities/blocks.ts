/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, fields } from './fields';

// Base
export type BlockRegistry<F extends Record<string, Field> = Record<string, Field>> = {
	name: string;
	fields: F;
};

export type Block<R extends BlockRegistry<any> = BlockRegistry<any>> = {
	name: R['name'];
	fields: {
		[K in keyof R['fields']]: R['fields'][K]['return_type'];
	} & {
		[key: string]: any;
	};
};

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

function registerBlock<F extends Record<string, Field>>(name: string, fields: F): BlockRegistry<F> {
	return {
		name,
		fields
	};
}

export function parseBlockRegistry<R extends BlockRegistry>(registry: R): Block<R> {
	return {
		name: registry.name,
		fields: Object.entries(registry.fields).reduce((acc, [key, field]) => {
			acc[key] = field.return_type;
			return acc;
		}, {} as any)
	};
}

// Blocks
const TextBlockRegister = registerBlock('text', {
	text: fields.text,
	fontSize: fields.number
});

export type TextBlock = Block<typeof TextBlockRegister>;

const IconBlockRegister = registerBlock('icon', {
	icon: fields.icon,
	color: fields.color
});

export type IconBlock = Block<typeof IconBlockRegister>;

const blockRegistriesArr = [TextBlockRegister, IconBlockRegister];
export const blockRegistries = blockRegistriesArr.reduce((acc, registry) => {
	acc[registry.name] = registry;
	return acc;
}, {} as Record<string, BlockRegistry>);
