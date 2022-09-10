import { Add16Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { Preview } from 'components/Preview';
import { SlideCard } from 'components/SlideCard';
import { SlideEditor } from 'components/SlideEditor';
import { useStringQuery } from 'hooks/useStringQuery';
import { alpha } from 'utils/color';
import { trpc } from 'utils/trpc';

const Presentation = () => {
	const id = useStringQuery('id');
	const queryClient = useQueryClient();
	const { data } = trpc.useQuery(['presentation.get', { id: id ?? '' }], { enabled: !!id });
	const addSlideMutation = trpc.useMutation('slide.create');

	const [slideIdx, setSlideIdx] = useState(0);

	const activeSlide = data?.slides[slideIdx];

	const addSlide = async () => {
		await addSlideMutation.mutateAsync({ presentationId: id ?? '' });
		queryClient.refetchQueries(['presentation.get']);
	};

	// TODO: Implement loader or ssr
	if (data === null || data === undefined) {
		return <div>Not found</div>;
	}

	return (
		<Wrapper>
			<Slides>
				{/* TODO: Make sticky */}
				<AddSlide iconLeft={<Add16Regular />} fullWidth onClick={addSlide}>
					Add slide
				</AddSlide>
				{data.slides.map((slide, index) => {
					const isSelected = index === slideIdx;

					return (
						<SlideCardWrapper
							key={slide.id}
							selected={isSelected}
							onClick={() => setSlideIdx(index)}
						>
							<p>{index + 1}</p>
							<SlideCard id={slide.id} selected={isSelected}>
								{index}
							</SlideCard>
						</SlideCardWrapper>
					);
				})}
			</Slides>
			<Preview slideId={activeSlide?.id} />
			<SlideEditor slideId={activeSlide?.id} />
		</Wrapper>
	);
};

export default Presentation;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 12.5rem 1fr 25%;
	flex: 1;
	overflow: hidden;
`;

const Slides = styled.div`
	height: 100%;
	overflow-y: scroll;
`;

const SlideCardWrapper = styled.button<{ selected?: boolean }>`
	display: grid;
	grid-template-columns: 16px 1fr;
	gap: 0.5rem;

	--selected-bg: ${({ theme }) => alpha(theme.palette.teal[20], 0.05)};
	background-color: ${(props) => (props.selected ? 'var(--selected-bg)' : 'transparent')};
	cursor: pointer;

	padding: 1rem 0.5rem;

	transition: background ${({ theme }) => theme.transition.appearance};

	&:hover {
		background-color: var(--selected-bg);
	}

	&:active {
		background-color: ${({ theme }) => alpha(theme.palette.teal[20], 0.1)};
	}
`;

const AddSlide = styled(Button)`
	border-top: none;
	border-left: none;
	border-right: none;
	border-radius: 0;
`;
