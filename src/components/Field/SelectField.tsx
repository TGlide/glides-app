import { useFormContext } from 'react-hook-form';

import { Select } from 'UI/Select';
import { SelectField as TSelectField } from 'entities/fields';

import { FieldProps } from './Field';

type SelectFieldProps = Omit<FieldProps, 'field'> & {
	field: TSelectField;
};

const SelectField = ({ field, name, ...props }: SelectFieldProps) => {
	const { register } = useFormContext();

	return (
		<Select {...register(name)} {...props}>
			{field.extra?.options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</Select>
	);
};

export default SelectField;
