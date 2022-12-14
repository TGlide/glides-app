import React from 'react';
import { Frown, Loader } from 'react-feather';
import styled, { keyframes } from 'styled-components';

import { Body } from 'UI/Text';

type NetworkStateProps = {
	loading?: boolean;
	error?: boolean;
};

export const NetworkState = ({ loading, error }: NetworkStateProps) => {
	return (
		<Wrapper>
			{loading && <Spin />}
			{error && (
				<Error>
					<Sad />
					<Body>An error has occurred. Please refresh the page.</Body>
				</Error>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;

	color: ${({ theme }) => theme.colors.accent};
`;

const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const Spin = styled(Loader)`
	animation: ${spin} 1s linear infinite;
	width: 4rem;
	height: 4rem;
`;

const Error = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${({ theme }) => theme.colors.danger};
`;

const Sad = styled(Frown)`
	width: 4rem;
	height: 4rem;
	margin-bottom: 1rem;
`;
