import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { Trash } from 'react-feather';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { Theme } from 'UI/Theme';
import { trpc } from 'utils/trpc';

type PresentationTopBarProps = {
	presentationId: string;
};

export const PresentationTopBar = ({ presentationId }: PresentationTopBarProps) => {
	const client = useQueryClient();
	const router = useRouter();

	const { data } = trpc.useQuery(['presentation.get', { id: presentationId }]);
	const updatePresentation = trpc.useMutation(['presentation.update']);
	const deletePresentation = trpc.useMutation(['presentation.delete']);

	const [title, setTitle] = useState(data?.title);

	const handleTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleTitleBlur = async () => {
		const newTitle = title || 'New presentation';
		await updatePresentation.mutateAsync({ id: presentationId, title: newTitle });
		client.invalidateQueries(['presentation.get']);
		client.invalidateQueries(['presentation.getAll']);
	};

	const handleDelete = async () => {
		await deletePresentation.mutateAsync({ id: presentationId });
		client.invalidateQueries(['presentation.getAll']);
		client.invalidateQueries(['presentation.get']);
		router.push('/');
	};

	return (
		<Theme variant="accent">
			<Wrapper>
				<Link href="/" passHref>
					<Clickable>
						<Logo src={'/logo_inverted_short.svg'} alt="Glides" />
					</Clickable>
				</Link>
				<EditTitle value={title} onInput={handleTitleInput} onBlur={handleTitleBlur} />
				<DeleteButton iconLeft={<Trash />} variant="danger" onClick={handleDelete}>
					Delete
				</DeleteButton>
			</Wrapper>
		</Theme>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;

	padding: 16px 8px;
`;

const Clickable = styled.a`
	display: grid;
	place-items: center;

	cursor: pointer;

	transition: opacity ${({ theme }) => theme.transition.appearance};

	&:hover {
		opacity: 0.75;
	}
`;

const Logo = styled.img`
	width: auto;
	height: 1.25rem;
`;

const EditTitle = styled.input`
	background: none;
	border: 1px solid transparent;
	border-radius: ${({ theme }) => theme.radii.m};

	padding: 0.25rem 0.5rem;

	color: ${({ theme }) => theme.colors.primary};

	font-family: ${({ theme }) => theme.fonts.sans};
	font-size: 1.25rem;
	margin-left: 1rem;

	outline: none;

	&:hover,
	&:focus,
	&:active {
		border: 1px solid ${({ theme }) => theme.colors.border};
	}
`;

const DeleteButton = styled(Button)`
	margin-left: auto;
`;
