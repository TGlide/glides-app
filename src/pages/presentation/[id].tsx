import { useState } from 'react';
import { Plus } from 'react-feather';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { NetworkState } from 'components/NetworkState';
import { PresentationTopBar } from 'components/PresentationTopBar';
import { Preview } from 'components/Preview';
import { SlideCard } from 'components/SlideCard';
import { SlideEditor } from 'components/SlideEditor';
import { useStringQuery } from 'hooks/useStringQuery';
import { alpha } from 'utils/color';
import { trpc } from 'utils/trpc';

const Presentation = () => {
	const id = useStringQuery('id');
	const queryClient = useQueryClient();
	const { data, error, isLoading } = trpc.useQuery(['presentation.get', { id: id ?? '' }], {
		enabled: !!id,
	});
	const addSlideMutation = trpc.useMutation('slide.create');

	const [slideIdx, setSlideIdx] = useState(0);

	const activeSlide = data?.slides[slideIdx];

	const addSlide = async () => {
		await addSlideMutation.mutateAsync({ presentationId: id ?? '' });
		queryClient.refetchQueries(['presentation.get']);
	};

	const sortedSlides = data?.slides.sort((a, b) => {
		return a.createdAt.getTime() - b.createdAt.getTime();
	});

	if (isLoading || !!error || !data || !id) {
		return <NetworkState loading={isLoading} error={!!error || !id} />;
	}

	return (
		<Main>
			<PresentationTopBar presentationId={id} />
			<Wrapper>
				<Slides>
					<AddSlide variant="accent-outline" iconLeft={<Plus />} fullWidth onClick={addSlide}>
						Add slide
					</AddSlide>
					{sortedSlides?.map((slide, index) => {
						const isSelected = index === slideIdx;

						return (
							<SlideCardWrapper
								key={slide.id}
								selected={isSelected}
								onClick={() => setSlideIdx(index)}
							>
								<p>{index + 1}</p>
								<SlideCard selected={isSelected} />
							</SlideCardWrapper>
						);
					})}
				</Slides>
				<Preview slideId={activeSlide?.id} />
				<SlideEditor slideId={activeSlide?.id} />
			</Wrapper>
		</Main>
	);
};

export default Presentation;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
`;

const Wrapper = styled.div`
	display: grid;
	flex: 1;
	overflow: hidden;

	@media (min-width: 768px) {
		grid-template-columns: 12.5rem 1fr 25%;
	}
`;

const Slides = styled.div`
	height: 100%;
	overflow-y: scroll;

	display: none;
	@media (min-width: 768px) {
		display: block;
	}
`;

const SlideCardWrapper = styled.button<{ selected?: boolean }>`
	display: grid;
	grid-template-columns: 16px 1fr;
	gap: 0.5rem;
	width: 100%;

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
