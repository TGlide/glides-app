export type FieldRegistry<T extends string | number = string | number, Extra = unknown> = {
	name: string;
	defaultValue: T;
	extra?: Extra;
};

type RegisterField<T extends string | number, Extra = unknown> = (
	defaultValue: T,
	extra?: Extra
) => FieldRegistry<T, Extra>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractFieldRegistry<RF extends RegisterField<any, any>> = RF extends RegisterField<
	infer T,
	infer Extra
>
	? FieldRegistry<T, Extra>
	: never;

export const registerTextField: RegisterField<string> = (defaultValue, extra) => ({
	name: 'text',
	defaultValue,
	extra
});

export type TextField = ExtractFieldRegistry<typeof registerTextField>;

export const registerNumberField: RegisterField<number> = (defaultValue, extra) => ({
	name: 'number',
	defaultValue,
	extra
});

export type NumberField = ExtractFieldRegistry<typeof registerNumberField>;

export const registerSelectField: RegisterField<string, { options: string[] }> = (
	defaultValue,
	extra
) => ({
	name: 'select',
	defaultValue,
	extra
});

export type SelectField = ExtractFieldRegistry<typeof registerSelectField>;
