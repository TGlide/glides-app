import { ComponentProps, useState } from 'react';

import { Modal } from './Modal';

export const useModal = () => {
	const [open, setOpen] = useState(false);

	const toggle = () => setOpen((prev) => !prev);

	const component = (props: Omit<ComponentProps<typeof Modal>, 'open' | 'setOpen'>) => (
		<Modal open={open} setOpen={setOpen} {...props} />
	);

	return {
		open,
		toggle,
		setOpen,
		Modal: component,
	};
};
