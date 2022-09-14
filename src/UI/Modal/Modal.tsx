import React from 'react';
import { X } from 'react-feather';
import styled from 'styled-components';

import { Button } from 'UI/Button';
import { Title } from 'UI/Text';
import { alpha } from 'utils/color';

type ModalProps = {
	title: string;
	children: React.ReactNode;
	open: boolean;
	setOpen: (open: boolean) => void;
};

export const Modal = ({ title, children, open, setOpen }: ModalProps) => {
	return (
		<StyledModal open={open}>
			<Card>
				<CardHeader>
					<Title>{title}</Title>
					<Button iconLeft={<X />} variant="danger" size="s" onClick={() => setOpen(false)} />
				</CardHeader>
				<CardBody>{children}</CardBody>
			</Card>
		</StyledModal>
	);
};

const StyledModal = styled.div<{ open?: boolean }>`
	display: ${({ open }) => (open ? 'block' : 'none')};

	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;

	background-color: ${({ theme }) => alpha(theme.palette.gray[10], 0.5)};

	width: 100%;
	height: 100%;
`;

const Card = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	background-color: ${({ theme }) => theme.palette.white};
	border-radius: ${({ theme }) => theme.radii.m};

	min-width: 300px;
`;

const CardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	padding: 1rem;
`;

const CardBody = styled.div`
	padding: 1rem;
`;
