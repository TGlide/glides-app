import { useFormContext } from 'react-hook-form';

import { Input } from 'UI/Input';

import { FieldProps } from './Field';

const TextField = ({ name, ...props }: FieldProps) => {
	const { register, watch } = useFormContext();
	console.log(name, watch());

	return <Input {...register(name)} {...props} />;
};

export default TextField;
