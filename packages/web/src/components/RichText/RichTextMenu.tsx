import { Button, HStack } from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import * as icons from 'react-icons/fi';
import { MarkType } from '@/components/RichText/models';
import styled from '@emotion/styled';
import React from 'react';
import { Editor } from 'slate';
import { toggleMark } from '@/components/RichText/functions';

interface ButtonProps {
    icon: keyof typeof icons;
    format: MarkType;
}

export interface RichTextMenuProps {
    markButtons?: MarkType[];
}

type AllButtonTypes = MarkType;

const iconDict: Record<AllButtonTypes, keyof typeof icons> = {
    bold: 'FiBold',
    code: 'FiCode',
    italic: 'FiItalic',
    underline: 'FiUnderline',
};

const StyledButton = styled(Button)<{ active?: string }>`
    background: ${({ active }) => (active ? 'var(--chakra-colors-gray-900)' : 'var(--chakra-colors-white)')};
    color: ${({ active }) => (active ? 'var(--chakra-colors-white)' : 'var(--chakra-colors-gray-900)')};
`;

export const RichTextMenu: React.FC<RichTextMenuProps> = ({ markButtons = ['bold', 'italic', 'underline'] }) => {
    return (
        <HStack>
            {markButtons.map((mb) => (
                <MarkButton key={mb} format={mb} icon={iconDict[mb]} />
            ))}
        </HStack>
    );
};

const MarkButton = ({ format, icon }: ButtonProps) => {
    const editor = useSlate();
    const Icon = icons[icon];
    const currentMarks = Editor.marks(editor);
    const active = currentMarks ? (currentMarks[format] === true ? true : undefined) : undefined;
    return (
        <StyledButton
            active={active?.toString()}
            onClick={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon />
        </StyledButton>
    );
};
