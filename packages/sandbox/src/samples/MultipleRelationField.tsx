import { scriptTemplate } from '@/src/samples/shared';
import { VStack, Heading, Code } from '@chakra-ui/react';
import { MultipleRelationField } from 'prosciutto-crudo';
import { useState } from 'react';

export default ({ code }: { code: string }) => {
    const [selectedOlives, setSelectedOlives] = useState<string[]>([]);
    return (
        <VStack alignItems="stretch">
            <Heading size="sm">Multiple Relation Field</Heading>
            <MultipleRelationField
                objects={[
                    {
                        name: 'Garlic Olive Oil',
                        _id: 'jsidaiudjsaui',
                    },
                    {
                        name: 'Pepper Olive Oil',
                        _id: 'dsdssadad',
                    },
                ]}
                displayKey="name"
                name="Olive Oil"
                primaryKey="_id"
                selectedObjects={selectedOlives}
                setSelectedObjects={setSelectedOlives}
            />
            <Code
                overflowX="auto"
                color="blue.700"
                variant="subtle"
                p="4"
                size="xs"
                whiteSpace="pre"
                dangerouslySetInnerHTML={{
                    __html: code,
                }}
            />
        </VStack>
    );
};
export const script = scriptTemplate(
    'MultipleRelationField',
    `const [selectedOlives, setSelectedOlives] = useState<string[]>([]);

    return <MultipleRelationField
        objects={[
            {
            name: 'Garlic Olive Oil',
            _id: 'jsidaiudjsaui',
            },
            {
            name: 'Pepper Olive Oil',
            _id: 'dsdssadad',
            },
        ]}
        displayKey="name"
        name="Olive Oil"
        primaryKey="_id"
        selectedObjects={selectedOlives}
        setSelectedObjects={setSelectedOlives}
    />
`,
);
