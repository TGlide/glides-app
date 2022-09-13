import { useFormContext } from 'react-hook-form';

import { Input } from 'UI/Input';

import { FieldProps } from './Field';

const NumberField = ({ name, ...props }: FieldProps) => {
	const { register } = useFormContext();
	return <Input {...register(name)} type="number" {...props} />;
};

export default NumberField;
