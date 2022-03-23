export type CustomElement = { type: 'paragraph'; children: CustomText[] };
export type CustomText = { text: string } & {
    [P in MarkType]?: true;
};
export type MarkType = 'bold' | 'italic' | 'underline' | 'code';
export const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;
export const BLOCK_TYPES = ['align', 'type'] as const;
export const HEADINGS = ['heading-1', 'heading-2'] as const;
