type PreviewProps = {
	content: any;
};

export const Preview = ({ content }: PreviewProps) => {
	return <div>{JSON.stringify(content)}</div>;
};
