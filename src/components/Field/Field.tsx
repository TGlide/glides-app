import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

import { Field as FieldType } from 'entities/fields';

export type FieldProps = {
	field: FieldType;
	value?: string;
	onChange: (value: string) => void;
	label?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Components: Record<string, ComponentType<FieldProps>> = {
	text: dynamic(() => import('./TextField')),
	number: dynamic(() => import('./NumberField'))
};

export const Field = (props: FieldProps) => {
	const Component = Components[props.field.name];

	if (typeof Component !== 'undefined') {
		return <Component {...props} />;
	}

	return null;
};
