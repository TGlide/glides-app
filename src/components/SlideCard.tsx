import styled from 'styled-components';

type SlideCardProps = {
	id: string;
	selected?: boolean;
};

export const SlideCard = ({ id, ...props }: SlideCardProps) => {
	return <Wrapper {...props} />;
};

const Wrapper = styled.div<{ selected?: boolean }>`
	display: grid;
	place-items: center;

	border: 2px solid
		${({ theme, selected }) => (selected ? theme.palette.teal[30] : theme.colors.tertiary)};
	border-radius: ${({ theme }) => theme.radii.s};
	color: ${({ theme }) => theme.colors.tertiary};

	font-size: 2rem;
	text-overflow: ellipsis;
	overflow: hidden;

	width: 100%;
	height: 5rem;

	transition: border ${({ theme }) => theme.transition.appearance};
`;
