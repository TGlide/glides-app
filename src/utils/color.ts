export const alpha = (hsla: string, percentage: number) => {
	const [h, s, l] = hsla
		.replace('hsla(', '')
		.replace(')', '')
		.split(',')
		.map((v) => v.trim());
	if (!h || !s || !l) return hsla;
	return `hsla(${h}, ${s}, ${l}, ${percentage})`;
};
