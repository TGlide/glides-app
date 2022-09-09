import styled from 'styled-components';

type SlideCardProps = {
	id: string;
	selected?: boolean;
	children?: React.ReactNode;
};

export const SlideCard = ({ id, ...props }: SlideCardProps) => {
	return <Wrapper {...props}>{id}</Wrapper>;
};

const Wrapper = styled.div<{ selected?: boolean }>`
	display: grid;
	place-items: center;

	border: 2px solid
		${({ theme, selected }) => (selected ? theme.palette.teal30 : theme.colors.tertiary)};
	border-radius: ${({ theme }) => theme.radii.s};
	color: ${({ theme }) => theme.colors.tertiary};

	font-size: 2rem;
	text-overflow: ellipsis;
	overflow: hidden;

	width: 100%;
	padding: 1rem;

	transition: border ${({ theme }) => theme.transition.appearance};
`;
