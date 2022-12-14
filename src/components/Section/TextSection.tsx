import React from 'react';
import styled from 'styled-components';

import { TextBlock } from 'entities/blocks';

type TextSectionProps = {
	block: TextBlock;
};

const TextSection = ({ block }: TextSectionProps) => {
	const { fields } = block;

	return (
		<StyledTextSection
			fontSize={fields.fontSize}
			fontWeight={fields.fontWeight}
			textAlign={fields.textAlign}
			fontFamily={fields.fontFamily}
		>
			{fields.text}
		</StyledTextSection>
	);
};

const StyledTextSection = styled.p<{
	fontSize: number;
	fontWeight: TextBlock['fields']['fontWeight'];
	textAlign: TextBlock['fields']['textAlign'];
	fontFamily: TextBlock['fields']['fontFamily'];
}>`
	font-size: ${({ fontSize }) => fontSize}px;
	font-weight: ${({ fontWeight }) => fontWeight};
	font-family: ${({ theme, fontFamily }) => theme.fonts[fontFamily as 'serif' | 'sans']};
	text-align: ${({ textAlign }) => textAlign};
	word-break: break-all;

	padding: 0.25rem 0;
`;

export default TextSection;
