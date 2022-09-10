import styled from 'styled-components';

import { parseSlideContent } from 'entities/slide';
import { trpc } from 'utils/trpc';

import { Section } from './Section';

type PreviewProps = {
	slideId?: string;
};

export const Preview = ({ slideId }: PreviewProps) => {
	const { data: slide } = trpc.useQuery(['slide.get', { id: slideId ?? '' }], {
		enabled: !!slideId
	});
	const content = parseSlideContent(slide?.content);

	return (
		<Wrapper>
			<Card>
				{content?.blocks.map((block, index) => (
					<Section key={index} block={block} />
				))}
			</Card>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 1rem;
`;

const Card = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii.m};
	padding: 1rem;
	height: 100%;
`;
