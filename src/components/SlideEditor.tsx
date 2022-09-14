import {
	Add16Filled,
	Add16Regular,
	Add20Regular,
	Add28Regular,
	Delete16Filled,
} from '@fluentui/react-icons';
import { Slide } from '@prisma/client';
import React from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { useModal } from 'UI/Modal';
import { Heading, SubHeading, Title } from 'UI/Text';
import { Block, BlockRegistry, blockRegistries, parseBlockRegistry } from 'entities/blocks';
import { parseSlideContent } from 'entities/slide';
import { objectEntries } from 'utils/object';
import { trpc } from 'utils/trpc';

import { SectionEditor } from './SectionEditor';

type EditorProps = {
	slideId?: string;
};

export const SlideEditor = ({ slideId }: EditorProps) => {
	const queryClient = useQueryClient();
	const deleteMutation = trpc.useMutation(['slide.delete']);
	const updateMutation = trpc.useMutation(['slide.update']);
	const { data: slide } = trpc.useQuery(['slide.get', { id: slideId ?? '' }], {
		enabled: !!slideId,
	});
	const content = parseSlideContent(slide?.content);

	const AddSectionModal = useModal();

	const handleDelete = async () => {
		if (!slide?.id) return;

		try {
			await deleteMutation.mutateAsync({ id: slide?.id });
		} catch {
			// Do nothing. The error normally is that the slide doesn't exist.
		}

		queryClient.invalidateQueries(['slide.get']);
		queryClient.invalidateQueries(['presentation.get']);
	};

	const addBlock = async (blockRegistry: BlockRegistry) => {
		if (!slideId) return;

		const newBlock = parseBlockRegistry(blockRegistry);

		const newContent = {
			...content,
			blocks: [...content.blocks, newBlock],
		};

		await updateMutation.mutateAsync({
			id: slideId,
			content: newContent,
		});

		queryClient.invalidateQueries(['slide.get']);
		AddSectionModal.setOpen(false);
	};

	const handleSaveBlock = async (block: Block, index: number) => {
		if (!slideId) return;

		const newContent = {
			...content,
			blocks: content.blocks.map((b, i) => (i === index ? block : b)),
		};

		await updateMutation.mutateAsync({
			id: slideId,
			content: newContent,
		});

		queryClient.invalidateQueries(['slide.get']);
	};

	const handleDeleteBlock = async (index: number) => {
		if (!slideId) return;

		const newContent = {
			...content,
			blocks: content.blocks.filter((_, i) => i !== index),
		};

		await updateMutation.mutateAsync({
			id: slideId,
			content: newContent,
		});

		queryClient.invalidateQueries(['slide.get']);
	};

	if (!slide) return null;

	return (
		<>
			<Wrapper>
				<SubHeading>Editor</SubHeading>
				<Title>Sections</Title>
				<Sections>
					{content.blocks.map((block, index) => {
						return (
							<SectionEditor
								onSave={(b) => handleSaveBlock(b, index)}
								onDelete={() => handleDeleteBlock(index)}
								block={block}
								key={index}
							/>
						);
					})}
					<Button iconLeft={<Add16Filled />} fullWidth onClick={AddSectionModal.toggle}>
						Add section
					</Button>
				</Sections>

				{/* TODO: Confirm deletion modal */}
				<DeleteButton
					iconLeft={<Delete16Filled />}
					variant="danger"
					fullWidth
					onClick={handleDelete}
				>
					Delete slide
				</DeleteButton>
			</Wrapper>
			<AddSectionModal.Modal title="Add section">
				{Object.values(blockRegistries).map((block) => (
					<BlockButton key={block.name} fullWidth onClick={() => addBlock(block)}>
						{block.name}
					</BlockButton>
				))}
			</AddSectionModal.Modal>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;

	border-left: 1px solid ${({ theme }) => theme.colors.tertiary};
	padding: 1rem;

	& > ${Title} {
		margin-top: 2rem;
	}
`;

const Sections = styled.div`
	margin-top: 1rem;

	& > *:not(:first-child) {
		margin-top: 1rem;
	}
`;

const DeleteButton = styled(Button)`
	margin-top: auto;
`;

const BlockButton = styled(Button)`
	text-transform: capitalize;

	&:not(:first-child) {
		margin-top: 0.5rem;
	}
`;
