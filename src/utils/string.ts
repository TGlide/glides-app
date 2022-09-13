export const capitalize = (str: string) => {
	return str.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

export const formatCamelCase = (str: string) => {
	return capitalize(str.replace(/([a-z])([A-Z])/g, '$1 $2'));
};
