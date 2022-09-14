import { useState } from 'react';
import { ChevronDown, ChevronRight, Delete, Save } from 'react-feather';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { Body } from 'UI/Text';
import { Field } from 'components/Field';
import { Block, blockRegistries } from 'entities/blocks';
import { alpha } from 'utils/color';
import { objectEntries } from 'utils/object';
import { formatCamelCase } from 'utils/string';

type SectionProps = {
	block: Block;
	onSave: (block: Block) => void;
	onDelete: () => void;
};

export const SectionEditor = ({ block, onSave, onDelete }: SectionProps) => {
	const [open, setOpen] = useState(false);
	const blockRegistry = blockRegistries[block.name];
	const methods = useForm({
		defaultValues: objectEntries(block?.fields ?? {})?.reduce(
			(acc, [name, field]) => ({
				...acc,
				[name]: field,
			}),
			{} as Record<string, string>,
		),
	});

	const { handleSubmit } = methods;

	const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
		if (!blockRegistry?.fields) return;

		const parsedFormData = objectEntries(blockRegistry.fields)?.reduce((acc, [name, field]) => {
			const formValue = data[name] ?? '';
			const parsedValue = typeof field.defaultValue === 'number' ? Number(formValue) : formValue;

			return {
				...acc,
				[name]: parsedValue,
			};
		}, {} as Record<string, string | number>);

		onSave({
			...block,
			fields: {
				...block.fields,
				...parsedFormData,
			},
		});
	};

	if (!blockRegistry) return null;

	return (
		<StyledSection>
			<Header onClick={() => setOpen((prev) => !prev)}>
				{open ? <ChevronDown /> : <ChevronRight />}
				<Body>{block.name}</Body>
			</Header>
			<FormProvider {...methods}>
				{open && (
					<Content>
						{Object.entries(blockRegistry.fields).map(([key, field]) => (
							<Field field={field} key={key} label={formatCamelCase(key)} name={key} />
						))}
						<ContentButtons>
							<Button iconLeft={<Save />} onClick={handleSubmit(onSubmit)}>
								Save
							</Button>
							<Button iconLeft={<Delete />} variant="danger" outline onClick={onDelete}>
								Delete
							</Button>
						</ContentButtons>
					</Content>
				)}
			</FormProvider>
		</StyledSection>
	);
};

const StyledSection = styled.div`
	background-color: ${({ theme }) => alpha(theme.colors.accent, 0.05)};
	border-radius: ${({ theme }) => theme.radii.m};

	padding: 1rem;
	width: 100%;
`;

const Header = styled.button`
	display: flex;
	align-items: center;
	width: 100%;
	gap: 0.5rem;

	color: ${({ theme }) => theme.colors.primary};
	cursor: pointer;

	text-transform: capitalize;

	transition: color ${({ theme }) => theme.transition.appearance};

	&:hover {
		color: ${({ theme }) => theme.colors.accent};
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1rem;
`;

const ContentButtons = styled.div`
	display: flex;
	gap: 0.5rem;

	& > * {
		flex: 1;
	}
`;
