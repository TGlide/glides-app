import { Input } from 'UI/Input';

import { FieldProps } from './Field';

const NumberField = ({ value, ...props }: FieldProps) => {
	return <Input value={`${value}`} type="number" {...props} />;
};

export default NumberField;
