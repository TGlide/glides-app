import * as IconsObj from 'react-feather';

import { isLowerCase } from 'utils/string';

export const iconNames = Object.keys(IconsObj).filter((key) => {
	if (isLowerCase(key[0] ?? '')) return false;
	return true;
});
