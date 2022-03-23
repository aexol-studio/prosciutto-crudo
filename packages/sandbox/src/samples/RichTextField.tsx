import { scriptTemplate } from '@/src/samples/shared';
import { VStack, Heading, Code } from '@chakra-ui/react';
import { RichContentField } from 'prosciutto-crudo';
import { useState } from 'react';
export default ({ code }: { code: string }) => {
    const [rcfValue, setRcfValue] = useState('');
    return (
        <VStack alignItems="stretch">
            <Heading size="sm">Rich Content Field</Heading>
            <RichContentField
                style={{ background: 'white', padding: '2rem' }}
                value={rcfValue}
                onChange={(e) => setRcfValue(e)}
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
    'RichContentField',
    `
    const [rcfValue, setRcfValue] = useState('');
    
    return <RichContentField
        style={{ background: 'white', padding: '2rem' }}
        value={rcfValue}
        onChange={(e) => setRcfValue(e)}
    />
    `,
);
