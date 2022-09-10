import { Input } from 'UI/Input';

import { FieldProps } from './Field';

const TextField = ({ value, ...props }: FieldProps) => {
	return <Input value={`${value}`} {...props} />;
};

export default TextField;
