import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

export const ProsciuttoProvider: React.FC = ({ children }) => {
    return <ChakraProvider>{children}</ChakraProvider>;
};
