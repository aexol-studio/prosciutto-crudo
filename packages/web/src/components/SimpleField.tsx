import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import React from 'react';

export function SimpleField({
    name,
    error,
    label,
    children,
}: {
    name?: string;
    error?: string;
    label?: string;
    children: React.ReactNode;
}) {
    return (
        <FormControl>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            {children}
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
}
