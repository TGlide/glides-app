import { Input } from 'UI/Input';
import { Select } from 'UI/Select';
import { SelectField as TSelectField } from 'entities/fields';

import { FieldProps } from './Field';

type SelectFieldProps = Omit<FieldProps, 'field'> & {
	field: TSelectField;
};

const SelectField = ({ value, field, ...props }: SelectFieldProps) => {
	return (
		<Select value={value} {...props}>
			{field.extra?.options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</Select>
	);
};

export default SelectField;
