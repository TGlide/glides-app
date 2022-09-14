import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

export type FieldProps = {
	// We use any here because we don't know the type of the field beforehand, since
	// it's a dynamic component
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field: any;
	label?: string;
	name: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Components: Record<string, ComponentType<FieldProps>> = {
	text: dynamic(() => import('./TextField')),
	number: dynamic(() => import('./NumberField')),
	select: dynamic(() => import('./SelectField')),
	blockArray: dynamic(() => import('./BlockArrayField'))
};

export const Field = (props: FieldProps) => {
	const Component = Components[props.field.name];

	if (typeof Component !== 'undefined') {
		return <Component {...props} />;
	}

	return null;
};
