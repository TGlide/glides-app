/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FieldRegistry,
	registerBlockArrayField,
	registerNumberField,
	registerSelectField,
	registerTextField,
} from './fields';
import { iconVariants } from './icon';

// Base
export type BlockRegistry<F extends Record<string, FieldRegistry> = Record<string, FieldRegistry>> =
	{
		name: string;
		fields: F;
	};

export type Block<R extends BlockRegistry<any> = BlockRegistry<any>> = {
	name: R['name'];
	fields: {
		[K in keyof R['fields']]: R['fields'][K]['defaultValue'];
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

function registerBlock<F extends Record<string, FieldRegistry>>(
	name: string,
	fields: F,
): BlockRegistry<F> {
	return {
		name,
		fields,
	};
}

export function parseBlockRegistry<R extends BlockRegistry>(registry: R): Block<R> {
	return {
		name: registry.name,
		fields: Object.entries(registry.fields).reduce((acc, [key, field]) => {
			acc[key] = field.defaultValue;
			return acc;
		}, {} as any),
	};
}

// Blocks
const TextBlockRegister = registerBlock('text', {
	text: registerTextField('Text'),
	fontSize: registerNumberField(16),
	fontWeight: registerSelectField('normal', {
		options: ['normal', 'bold'],
	}),
	textAlign: registerSelectField('left', {
		options: ['left', 'center', 'right'],
	}),
});

export type TextBlock = Block<typeof TextBlockRegister>;

const IconBlockRegister = registerBlock('icon', {
	icon: registerSelectField('icon', { options: iconVariants }),
	color: registerTextField('#000000'),
});

export type IconBlock = Block<typeof IconBlockRegister>;

const FeatureBlockRegister = registerBlock('feature', {
	icon: registerBlockArrayField([], { allowedBlocks: ['icon'], max: 1 }),
	title: registerTextField('Title'),
});

const GridBlockRegister = registerBlock('grid', {
	features: registerBlockArrayField([], { allowedBlocks: ['feature'], max: 3 }),
});

export const blockRegistriesArr = [
	TextBlockRegister,
	IconBlockRegister,
	FeatureBlockRegister,
	GridBlockRegister,
] as const;

export const blockRegistries = blockRegistriesArr.reduce((acc, registry) => {
	acc[registry.name] = registry;
	return acc;
}, {} as Record<string, BlockRegistry>);
