import { CalendarEdit16Regular } from '@fluentui/react-icons';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { Body, Meta } from 'UI/Text';

type PresentationProps = {
	title: string;
	editedAt?: Date;
	onClick?: () => void;
};

export const PresentationCard = ({ title, editedAt, onClick }: PresentationProps) => {
	return (
		<Wrapper onClick={onClick}>
			<Cover src="https://visme.co/blog/wp-content/uploads/2019/08/presentation-slides-Business-Annual-Report-Template.jpg" />
			<Title>{title}</Title>
			<MetaWrapper>
				<CalendarEdit16Regular />
				<Meta>{dayjs(editedAt).format('DD/MM/YYYY')}</Meta>
			</MetaWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.button`
	--width: 11.25rem;
	width: var(--width);
	overflow: hidden;
	text-align: left;

	transition: opacity ${({ theme }) => theme.transition.appearance};

	&:hover {
		cursor: pointer;
		opacity: 0.75;
	}
`;

const Cover = styled.img`
	border-radius: ${({ theme }) => theme.radii.m};
	object-fit: cover;

	width: var(--width);
	height: var(--width);
`;

const Title = styled(Body)`
	word-break: break-all;
	margin-top: 0.25rem;
`;

const MetaWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-top: 0.25rem;
	color: ${({ theme }) => theme.colors.secondary};

	& > *:not(:last-child) {
		margin-right: 0.25rem;
	}
`;
