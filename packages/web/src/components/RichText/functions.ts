import { CustomText } from '@/components/RichText/models';
import { CustomTypes, Editor } from 'slate';

export const toggleMark = (editor: CustomTypes['Editor'], format: keyof Omit<CustomText, 'text'>) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export const isMarkActive = (editor: CustomTypes['Editor'], format: keyof Omit<CustomText, 'text'>) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
