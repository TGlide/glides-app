import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

import { Block } from 'entities/blocks';

export type SectionProps = {
	block: Block;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Components: Record<string, ComponentType<{ block: any }>> = {
	text: dynamic(() => import('./TextSection')),
	icon: dynamic(() => import('./IconSection')),
};

export const Section = (props: SectionProps) => {
	const Component = Components[props.block.name];

	if (typeof Component !== 'undefined') {
		return <Component {...props} />;
	}

	return null;
};
