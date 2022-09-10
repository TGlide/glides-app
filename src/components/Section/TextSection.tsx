import React from 'react';
import styled from 'styled-components';

import { TextBlock } from 'entities/blocks';

type TextSectionProps = {
	block: TextBlock;
};

const TextSection = ({ block }: TextSectionProps) => {
	const { fields } = block;
	return <StyledTextSection fontSize={fields.fontSize}>{fields.text}</StyledTextSection>;
};

const StyledTextSection = styled.p<{ fontSize: number }>`
	font-size: ${({ fontSize }) => fontSize}px;
`;

export default TextSection;
