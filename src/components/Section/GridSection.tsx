import React from 'react';
import styled from 'styled-components';

import { GridBlock } from 'entities/blocks';

import { Section } from './Section';

type GridSectionProps = {
	block: GridBlock;
};

const GridSection = ({ block }: GridSectionProps) => {
	return (
		<Wrapper>
			{block.fields.features.map((feature, index) => (
				<Section block={feature} key={index} />
			))}
		</Wrapper>
	);
};

export default GridSection;

const Wrapper = styled('div')((props) => ({
	display: 'grid',
	gap: '1rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 300px))',
	justifyContent: 'center',
	alignItems: 'flex-start',

	padding: '2rem',
}));
