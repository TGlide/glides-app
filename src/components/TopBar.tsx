import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export const TopBar = () => {
	return (
		<StyledTopBar>
			<Link href="/" passHref>
				<Clickable>
					<Logo src={'/logo_inverted.svg'} alt="Glides" />
				</Clickable>
			</Link>
		</StyledTopBar>
	);
};

const StyledTopBar = styled.div`
	background-color: ${({ theme }) => theme.colors.accent};
	padding: 16px 8px;
`;

const Clickable = styled.a`
	cursor: pointer;

	transition: opacity ${({ theme }) => theme.transition.appearance};

	&:hover {
		opacity: 0.75;
	}
`;

const Logo = styled.img`
	width: auto;
	height: 1.25rem;
`;
