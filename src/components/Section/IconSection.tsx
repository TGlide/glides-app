import React from 'react';
import styled from 'styled-components';
import { color, ColorProps } from 'styled-system';

import { Icon } from 'UI/Icon';
import { IconBlock } from 'entities/blocks';
import { isIconVariant } from 'entities/icon';

type IconSectionProps = {
	block: IconBlock;
};

const IconSection = ({ block }: IconSectionProps) => {
	const { fields } = block;

	if (!isIconVariant(fields.icon)) return null;

	return <StyledIconSection variant={fields.icon} color={fields.color} />;
};

const StyledIconSection = styled(Icon)<ColorProps>(color);

export default IconSection;
