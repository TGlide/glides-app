import { Add16Regular } from '@fluentui/react-icons';
import styled from 'styled-components';

type AddPresentationProps = {
	onClick: () => void;
};

export const AddPresentation = (props: AddPresentationProps) => {
	return (
		<Wrapper {...props}>
			<AddIcon />
		</Wrapper>
	);
};

const Wrapper = styled.button`
	display: grid;
	place-items: center;

	border: 2px solid ${({ theme }) => theme.colors.tertiary};
	border-radius: ${({ theme }) => theme.radii.l};
	color: ${({ theme }) => theme.colors.tertiary};

	width: 11.25rem;
	height: 11.25rem;

	transition: opacity ${({ theme }) => theme.transition.appearance};

	&:hover {
		cursor: pointer;
		opacity: 0.75;
	}

	&:active {
		cursor: pointer;
		opacity: 0.5;
	}
`;

const AddIcon = styled(Add16Regular)`
	width: 2.75rem;
	height: 2.75rem;
`;
