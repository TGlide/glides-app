export type Field<T extends string | number = string | number> = {
	name: string;
	return_type: T;
};

function createField(name: string, return_type: 'string'): Field<string>;
function createField(name: string, return_type: 'number'): Field<number>;

function createField(name: string, return_type: 'string' | 'number'): Field<string | number> {
	if (return_type === 'string') {
		return {
			name,
			return_type: '' as string
		};
	}

	return {
		name,
		return_type: 0 as number
	};
}

const textField = createField('text', 'string');
const numberField = createField('number', 'number');
const iconField = createField('icon', 'string');
const colorField = createField('color', 'string');

export const fields = {
	text: textField,
	number: numberField,
	icon: iconField,
	color: colorField
};
