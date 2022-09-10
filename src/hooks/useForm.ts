import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialState: T) => {
	const [formData, setFormData] = useState(initialState);

	const onChange = (name: keyof T) => {
		return (value: T[keyof T]) => {
			setFormData({ ...formData, [name]: value });
		};
	};

	const handleSubmit = (callback: (formData: T) => void) => {
		return (e: SubmitEvent) => {
			e.preventDefault();
			callback(formData);
		};
	};

	return { formData, onChange, handleSubmit };
};
