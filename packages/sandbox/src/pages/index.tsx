import Logo from '@/src/assets/svg/Logo';
import { Layout } from '@/src/layouts';
import { people } from '@/src/mocks';
import { VStack, Container, Heading, Text, Box } from '@chakra-ui/react';
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
                <VStack alignItems="stretch">
                    <VStack alignItems="center" mb="8">
                        <Box w="28">
                            <Logo />
                        </Box>
                        <Heading>Prosciutto CRUD'o</Heading>
                        <Text align="center">
                            Simple Tables and forms to create a nice looking admin panel in short amount of time. Go
                            ahead take a slice.
                        </Text>
                    </VStack>

                    <VStack alignItems="stretch">
                        <Heading size="xs">Generic Table</Heading>
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
                    </VStack>

                    <VStack alignItems="stretch">
                        <Heading size="xs">Rich Content Field</Heading>
                        <RichContentField
                            style={{ background: 'white', padding: '2rem' }}
                            value={rcfValue}
                            onChange={(e) => setRcfValue(e)}
                        />
                        <Heading size="xs">Multiple Relation Field</Heading>
                    </VStack>

                    <VStack alignItems="stretch">
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
                    </VStack>
                </VStack>
            </Container>
        </Layout>
    );
};

export default HomePage;
