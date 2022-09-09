import { useRouter } from 'next/router';

export const useStringQuery = (queryKey: string) => {
	const router = useRouter();
	const key = router.query[queryKey];
	return typeof key === 'string' ? key : null;
};
