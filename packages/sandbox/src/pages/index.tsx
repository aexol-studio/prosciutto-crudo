import Logo from '@/src/assets/svg/Logo';
import { Layout } from '@/src/layouts';
import MultipleRelationField, { script as multipleRelationFieldScript } from '@/src/samples/MultipleRelationField';
import RichTextField, { script as richTextFieldScript } from '@/src/samples/RichTextField';
import { VStack, Container, Heading, Text, Box, Code, Link } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import 'highlight.js/styles/default.css';
import GenericTable, { script as genericTableScript } from '@/src/samples/GenericTable';

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout pageTitle="HomePage">
            <Container background="gray.100" p="8" maxW="container.md">
                <VStack alignItems="stretch" spacing="16">
                    <VStack alignItems="center">
                        <Box w="28">
                            <Logo />
                        </Box>
                        <Heading>Prosciutto CRUDo</Heading>
                        <Text maxW="md" align="center">
                            Simple Tables and forms to create a nice looking admin panel in short amount of time. Go
                            ahead take a slice.
                        </Text>
                    </VStack>

                    <VStack alignItems="stretch" spacing="12">
                        <VStack alignItems="start">
                            <Heading size="sm">Getting Started</Heading>
                            <Text>
                                Install <Link href="https://chakra-ui.com/">Chakra UI</Link>
                            </Text>
                            <Heading size="sm">Install peer deps</Heading>
                            <Code>
                                npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
                                react-icons
                            </Code>
                            <Heading size="sm">Then install prosciutto</Heading>
                            <Code>{`npm install prosciutto-crudo`}</Code>
                            <Heading size="sm">
                                Then wrap your app in <Code>ChakraProvider</Code>
                            </Heading>
                            <Text>Use!</Text>
                        </VStack>
                        <GenericTable code={props.genericTable} />
                        <RichTextField code={props.richContentField} />
                        <MultipleRelationField code={props.multipleRelationField} />
                    </VStack>
                </VStack>
            </Container>
        </Layout>
    );
};

export default HomePage;

export const getStaticProps = async () => {
    const { default: hljs } = await import('highlight.js');
    return {
        props: {
            genericTable: hljs.highlight('typescript', genericTableScript).value,
            richContentField: hljs.highlight('typescript', richTextFieldScript).value,
            multipleRelationField: hljs.highlight('typescript', multipleRelationFieldScript).value,
        },
    };
};
const theme = {
    styles: {
        global: {
            'html, body': {
                color: 'gray.600',
                lineHeight: 'tall',
            },
            a: {
                color: 'teal.500',
            },
        },
    },
};
