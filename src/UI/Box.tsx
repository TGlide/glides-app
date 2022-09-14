import styled from 'styled-components';
import {
	compose,
	typography,
	space,
	color,
	layout,
	flexbox,
	grid,
	background,
	border,
	position,
	ColorProps,
	SpaceProps,
	LayoutProps,
	TypographyProps,
	FlexboxProps,
	GridProps,
	BackgroundProps,
	BorderProps,
	PositionProps,
} from 'styled-system';

type BoxProps = SpaceProps &
	ColorProps &
	LayoutProps &
	TypographyProps &
	FlexboxProps &
	GridProps &
	BackgroundProps &
	BorderProps &
	PositionProps;

export const Box = styled('div')<BoxProps>(
	compose(space, color, layout, typography, flexbox, grid, background, border, position),
);

export const Flex = styled(Box)({
	display: 'flex',
});

<Box />;
