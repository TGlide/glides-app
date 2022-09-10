import { parseSlideContent } from 'entities/slide';
import { trpc } from 'utils/trpc';

type PreviewProps = {
	slideId?: string;
};

export const Preview = ({ slideId }: PreviewProps) => {
	const { data: slide } = trpc.useQuery(['slide.get', { id: slideId ?? '' }], {
		enabled: !!slideId
	});
	const content = parseSlideContent(slide?.content);

	return <div>{JSON.stringify(content)}</div>;
};
