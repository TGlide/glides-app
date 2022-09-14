import React from 'react';
import * as FeatherIcon from 'react-feather';

import { IconVariant } from 'entities/icon';

type IconProps = {
	variant: IconVariant;
	className?: string;
};

export const Icon = ({ variant, ...props }: IconProps) => {
	// eslint-disable-next-line import/namespace
	const Component = FeatherIcon[variant];
	return <Component {...props} />;
};
