import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { Flex } from 'UI/Box';
import { Button } from 'UI/Button';
import { useModal } from 'UI/Modal';
import { SectionEditor } from 'components/SectionEditor';
import { blockRegistries, isBlock, parseBlockRegistry } from 'entities/blocks';
import { BlockArrayField as TBlockArrayField } from 'entities/fields';
import { capitalize } from 'utils/string';

import { FieldProps } from './Field';

type BlockArrayFieldProps = Omit<FieldProps, 'field'> & {
	field: TBlockArrayField;
};

const BlockArrayField = ({ field, name, label }: BlockArrayFieldProps) => {
	const { control } = useFormContext();
	const { fields, append, remove, swap } = useFieldArray({
		control,
		name,
	});
	const AddBlock = useModal();

	const filteredBlockRegs = Object.entries(blockRegistries).filter(([blockName]) => {
		return field?.extra?.allowedBlocks?.includes(blockName) ?? true;
	});

	const maxBlocks = field.extra?.max ?? Infinity;

	const handleReorder = (direction: 'up' | 'down', index: number) => {
		if (direction === 'up' && index === 0) return;
		if (direction === 'down' && index === fields.length - 1) return;

		swap(index, direction === 'up' ? index - 1 : index + 1);
	};

	return (
		<>
			<Wrapper>
				<Label>{label}</Label>
				<Blocks>
					{fields.map((item, index) => {
						if (!isBlock(item)) return null;

						return (
							<SectionEditor
								onReorder={(direction) => handleReorder(direction, index)}
								block={item}
								onDelete={() => remove(index)}
								key={item.id}
								nestedKey={`${name}[${index}].fields`}
							/>
						);
					})}
					{fields.length < maxBlocks && (
						<Button onClick={() => AddBlock.toggle()}>Add block</Button>
					)}
				</Blocks>
			</Wrapper>
			<AddBlock.Modal title="Add block">
				<Flex flexDirection="column">
					{filteredBlockRegs.map(([blockName, blockReg]) => (
						<Button
							key={blockName}
							onClick={() => {
								const block = parseBlockRegistry(blockReg);
								append(block);
								AddBlock.setOpen(false);
							}}
						>
							{capitalize(blockName)}
						</Button>
					))}
				</Flex>
			</AddBlock.Modal>
		</>
	);
};

export default BlockArrayField;

const Wrapper = styled.div({});

const Label = styled.p({});

const Blocks = styled.div({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	marginTop: '0.5rem',
});
