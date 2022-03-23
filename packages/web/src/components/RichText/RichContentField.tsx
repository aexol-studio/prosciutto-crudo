import React, { useCallback, useMemo } from 'react';
import { BaseEditor, createEditor } from 'slate';
import { Editable, Slate, withReact, RenderLeafProps, RenderElementProps, ReactEditor } from 'slate-react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { CustomElement, CustomText } from '@/components/RichText/models';
import { RichTextMenu, RichTextMenuProps } from '@/components/RichText/RichTextMenu';
import { VStack } from '@chakra-ui/react';
import { toggleMark } from '@/components/RichText/functions';
import { Leaf, Element } from '@/components/RichText/RichText';
import { withHistory } from 'slate-history';

interface RichContentFieldProps extends Omit<EditableProps, 'value' | 'onChange'> {
    value: string | null;
    onChange: (e: string) => void;
    menu?: Omit<RichTextMenuProps, 'editor'>;
}

const JSONparseBlockInvalid = (text: string): CustomElement[] => {
    try {
        return JSON.parse(text);
    } catch (error) {
        return [{ type: 'paragraph', children: [{ text: '' }] }];
    }
};

export const RichContentField: React.FC<RichContentFieldProps> = ({ value, onChange, menu, ...editableProps }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />;
    }, []);
    const renderElement = useCallback((props: RenderElementProps) => {
        return <Element {...props} />;
    }, []);
    editor.children = JSONparseBlockInvalid(value || '');
    return (
        <Slate
            editor={editor}
            value={JSONparseBlockInvalid(value || '')}
            onChange={(val) => onChange(JSON.stringify(val))}
        >
            <VStack alignItems={'stretch'}>
                <RichTextMenu {...menu} />
                <Editable
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                    onKeyDown={(event) => {
                        if (!event.ctrlKey) {
                            return;
                        }
                        switch (event.key) {
                            case 'b': {
                                event.preventDefault();
                                toggleMark(editor, 'bold');
                                break;
                            }
                        }
                    }}
                    {...editableProps}
                />
            </VStack>
        </Slate>
    );
};

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
