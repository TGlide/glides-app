import * as IconsObj from 'react-feather';

import { objectKeys } from 'utils/object';
import { isLowerCase } from 'utils/string';

export const iconVariants = objectKeys(IconsObj).filter((key) => {
	if (isLowerCase(key[0] ?? '')) return false;
	return true;
});

export type IconVariant = typeof iconVariants[number];

export function isIconVariant(value: unknown): value is IconVariant {
	return typeof value === 'string' && iconVariants.includes(value as IconVariant);
}
