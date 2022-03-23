import { scriptTemplate } from '@/src/samples/shared';
import { VStack, Heading, Code } from '@chakra-ui/react';
import { ProsciuttoFactory } from 'prosciutto-crudo';
import { people } from '@/src/mocks';
import { useState } from 'react';

const { GenericTable } = ProsciuttoFactory<{
    Person: {
        firstName: string;
        lastName: string;
        id: string;
    };
}>();

export default ({ code }: { code: string }) => {
    const [tablePeople, setTablePeople] = useState(people);
    return (
        <VStack alignItems="stretch">
            <Heading size="sm">Generic Table</Heading>
            <GenericTable
                onDelete={(o) => setTablePeople((ppl) => ppl.filter((p) => p.id !== o.id))}
                object="Person"
                objects={tablePeople}
                primaryKey="id"
                searchKey="lastName"
                params={[
                    { key: 'firstName', label: 'First Name' },
                    {
                        key: 'lastName',
                        label: 'Last Name',
                    },
                ]}
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

export const script = `import { ProsciuttoFactory } from 'prosciutto-crudo';
const { GenericTable } = ProsciuttoFactory<{
    Person: {
        firstName: string;
        lastName: string;
        id: string;
    };
}>();

export default () => {
    const [tablePeople, setTablePeople] = useState(people);
    return <GenericTable
        onDelete={(o) => setTablePeople(
            (ppl) => ppl.filter((p) => p.id !== o.id)
        )}
        object="Person"
        objects={tablePeople}
        primaryKey="id"
        searchKey="lastName"
        params={[
            { key: 'firstName', label: 'First Name' },
            { key: 'lastName', label: 'Last Name', },
        ]}
    />
}
    `;
