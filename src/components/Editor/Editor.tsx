import {
	Add16Filled,
	Add16Regular,
	Add20Regular,
	Add28Regular,
	Delete16Filled
} from '@fluentui/react-icons';
import { Slide } from '@prisma/client';
import React from 'react';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { Heading, SubHeading, Title } from 'UI/Text';
import { parseSlideContent } from 'entities/slide';

type EditorProps = {
	slide?: Slide;
};

export const Editor = ({ slide }: EditorProps) => {
	const content = parseSlideContent(slide?.content);

	return (
		<Wrapper>
			<SubHeading>Editor</SubHeading>
			<Title>Sections</Title>
			<Sections>
				<Button iconLeft={<Add16Filled />} fullWidth>
					Add section
				</Button>
			</Sections>

			{/* TODO: Confirm deletion modal */}
			<DeleteButton iconLeft={<Delete16Filled />} variant="danger" fullWidth>
				Delete slide
			</DeleteButton>
		</Wrapper>
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
`;

const DeleteButton = styled(Button)`
	margin-top: auto;
`;
