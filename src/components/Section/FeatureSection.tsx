import React from 'react';
import styled from 'styled-components';
import { marginTop } from 'styled-system';

import { FeatureBlock } from 'entities/blocks';

import { Section } from './Section';

type FeatureSectionProps = {
	block: FeatureBlock;
};

const FeatureSection = ({ block }: FeatureSectionProps) => {
	const icon = block.fields.icon[0];
	return (
		<Wrapper>
			{icon && <Section block={icon} />}
			<Title>{block.fields.title}</Title>
			<Body>{block.fields.body}</Body>
		</Wrapper>
	);
};

export default FeatureSection;

const Wrapper = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	textAlign: 'center',
});

const Title = styled('h2')({
	fontWeight: 700,
	fontSize: '1.5rem',
	marginTop: '0.5rem',
});

const Body = styled('p')({
	fontSize: '1.15rem',
	marginTop: '0.5rem',
});
