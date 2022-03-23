import Logo from '@/src/assets/svg/Logo';
import { Layout } from '@/src/layouts';
import { people } from '@/src/mocks';
import { VStack, Container, Heading, Text, Box, Code } from '@chakra-ui/react';
import { MultipleRelationField, ProsciuttoFactory, RichContentField } from 'prosciutto-crudo';
import { useState } from 'react';

const { GenericTable } = ProsciuttoFactory<{
    Person: {
        firstName: string;
        lastName: string;
        id: string;
    };
}>();

const HomePage = () => {
    const [rcfValue, setRcfValue] = useState('');
    const [selectedOlives, setSelectedOlives] = useState<string[]>([]);
    const [tablePeople, setTablePeople] = useState(people);
    return (
        <Layout pageTitle="HomePage">
            <Container background="gray.100" p="8">
                <VStack alignItems="stretch" spacing="16">
                    <VStack alignItems="center">
                        <Box w="28">
                            <Logo />
                        </Box>
                        <Heading>Prosciutto CRUDo</Heading>
                        <Text align="center">
                            Simple Tables and forms to create a nice looking admin panel in short amount of time. Go
                            ahead take a slice.
                        </Text>
                    </VStack>

                    <VStack alignItems="stretch" spacing="12">
                        <VStack alignItems="start">
                            <Heading size="sm">Installation</Heading>
                            <Code>{`npm install prosciutto-crudo`}</Code>
                        </VStack>

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
                            <Code overflowX="auto" color="blue.700" variant="subtle" p="4" size="xs" whiteSpace="pre">{`
<GenericTable
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
                            `}</Code>
                        </VStack>

                        <VStack alignItems="stretch">
                            <Heading size="sm">Rich Content Field</Heading>
                            <RichContentField
                                style={{ background: 'white', padding: '2rem' }}
                                value={rcfValue}
                                onChange={(e) => setRcfValue(e)}
                            />
                            <Code overflowX="auto" color="blue.700" variant="subtle" p="4" size="xs" whiteSpace="pre">{`
<RichContentField
    style={{ background: 'white', padding: '2rem' }}
    value={rcfValue}
    onChange={(e) => setRcfValue(e)}
/>
                            `}</Code>
                        </VStack>

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
                            <Code overflowX="auto" color="blue.700" variant="subtle" p="4" size="xs" whiteSpace="pre">{`
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
                            `}</Code>
                        </VStack>
                    </VStack>
                </VStack>
            </Container>
        </Layout>
    );
};

export default HomePage;
