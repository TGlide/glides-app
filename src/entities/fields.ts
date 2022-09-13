import { text } from 'stream/consumers';

export type FieldRegistry<T extends string | number = string | number, Extra = unknown> = {
	name: string;
	defaultValue?: T;
	extra?: Extra;
};

type RegisterField<T extends string | number, Extra = unknown> = (
	defaultValue: T,
	extra?: Extra
) => FieldRegistry<T, Extra>;

export const registerTextField: RegisterField<string> = (defaultValue, extra) => ({
	name: 'text',
	defaultValue,
	extra
});

export const registerNumberField: RegisterField<number> = (defaultValue, extra) => ({
	name: 'number',
	defaultValue,
	extra
});

export const registerSelectField: RegisterField<string, { options: string[] }> = (
	defaultValue,
	extra
) => ({
	name: 'select',
	defaultValue,
	extra
});
