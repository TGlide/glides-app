import { Plus, Trash } from 'react-feather';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { useModal } from 'UI/Modal';
import { SubHeading, Title } from 'UI/Text';
import { Block, blockRegistries, BlockRegistry, parseBlockRegistry } from 'entities/blocks';
import { parseSlideContent } from 'entities/slide';
import { trpc } from 'utils/trpc';

import { SectionEditor } from './SectionEditor';

type EditorProps = {
	slideId?: string;
};

export const SlideEditor = ({ slideId }: EditorProps) => {
	const queryClient = useQueryClient();
	const deleteMutation = trpc.useMutation(['slide.delete']);
	const updateMutation = trpc.useMutation(['slide.update'], {
		onMutate: async (newSlide) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries(['slide.get', { id: slideId }]);

			// Snapshot the previous value
			const previousSlide = queryClient.getQueryData(['slide.get', { id: slideId }]);

			// Optimistically update to the new value
			queryClient.setQueryData(['slide.get', { id: slideId }], newSlide);

			// Return a context object with the snapshotted value
			return { previousSlide };
		},
		// If the mutation fails, use the context we returned above
		onError: (_err, _newSlide, context) => {
			queryClient.setQueryData(['slide.get', { id: slideId }], context?.previousSlide);
		},
		// If the mutation succeeds, invalidate the old data
		onSettled: () => {
			queryClient.invalidateQueries(['slide.get', { id: slideId }]);
		},
	});
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

	const handleReorderBlock = async (direction: 'up' | 'down', index: number) => {
		if (!slideId) return;

		if (direction === 'up' && index === 0) return;
		if (direction === 'down' && index === content.blocks.length - 1) return;

		const newIndex = direction === 'up' ? index - 1 : index + 1;
		const newContent = {
			...content,
			blocks: content.blocks.map((b, i) => {
				if (i === index) return content.blocks[newIndex];
				if (i === newIndex) return content.blocks[index];
				return b;
			}),
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
								onReorder={(direction) => handleReorderBlock(direction, index)}
								block={block}
								key={block.uid}
							/>
						);
					})}
					<Button
						variant="accent-outline"
						iconLeft={<Plus />}
						fullWidth
						onClick={AddSectionModal.toggle}
					>
						Add section
					</Button>
				</Sections>

				<DeleteButton iconLeft={<Trash />} variant="danger" fullWidth onClick={handleDelete}>
					Delete slide
				</DeleteButton>
			</Wrapper>
			<AddSectionModal.Modal title="Add section">
				{Object.values(blockRegistries).map((block) => (
					<BlockButton
						variant="accent-outline"
						key={block.name}
						fullWidth
						onClick={() => addBlock(block)}
					>
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

	display: none;

	@media (min-width: 768px) {
		display: flex;
	}
`;

const Sections = styled.div`
	padding-bottom: 1rem;
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
