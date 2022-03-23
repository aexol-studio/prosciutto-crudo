import { CustomElement } from '@/components/RichText/models';
import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

export const RichText = (elements: CustomElement[]) => {
    return (
        <>
            {elements.map((e) => {
                switch (e.type) {
                    case 'paragraph':
                        return e.children.map((c) => (
                            <Leaf attributes={{ 'data-slate-leaf': true }} leaf={c} text={c}>
                                {c.text}
                            </Leaf>
                        ));
                    default:
                        break;
                }
            })}
        </>
    );
};

export const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

export const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
    const style = {};
    switch (element.type) {
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};
