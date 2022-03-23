import {
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Input,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

export function GenericTable<GraphQLTypes>() {
    return function <GraphQLType extends keyof GraphQLTypes, ObjectType = GraphQLTypes[GraphQLType]>({
        params,
        primaryKey,
        objects,
        searchKey,
        caption = 'Objects',
        children,
        onDelete,
        onEdit,
        isLoading,
    }: {
        params: Array<{ key: keyof ObjectType; label: string }>;
        primaryKey: keyof ObjectType;
        objects: Array<ObjectType>;
        object: GraphQLType;
        searchKey: keyof ObjectType;
        caption?: string;
        children?: React.ReactNode;
        isLoading?: boolean;
        onEdit?: (o: ObjectType) => void;
        onDelete?: (o: ObjectType) => unknown | Promise<unknown>;
    }) {
        const [deletedObject, setDeletedObject] = useState<ObjectType>();
        const [search, setSearch] = useState('');
        const [isDeleting, setIsDeleting] = useState(false);
        const [deletedObjects, setDeletedObjects] = useState<ObjectType[typeof primaryKey][]>([]);
        const filteredObjects = objects
            .filter((o) => !deletedObjects.includes(o[primaryKey]))
            .filter((o) => (o[searchKey] as unknown as string).toLowerCase().includes(search.toLowerCase()));
        if (!primaryKey) {
            throw new Error('Set the primaryKey property on GenericTable.');
        }
        return (
            <>
                <HStack mb="2">
                    <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    {children}
                </HStack>
                <Table variant="striped" colorScheme="gray" bg="gray.200">
                    <TableCaption>{caption}</TableCaption>
                    <Thead>
                        <Tr>
                            {params.map((p) => (
                                <Th key={p.label}>{p.label}</Th>
                            ))}
                            <Th textAlign="end">Actions</Th>
                        </Tr>
                    </Thead>
                    {isLoading && (
                        <Tbody>
                            <Tr>
                                {params.map((p) => (
                                    <Td key={p.label}>
                                        <Spinner />
                                    </Td>
                                ))}
                                <Td>
                                    <Spinner />
                                </Td>
                            </Tr>
                        </Tbody>
                    )}
                    {!isLoading && (
                        <Tbody>
                            {filteredObjects.map((o) => (
                                <Tr key={o[primaryKey] as unknown as React.Key} alignItems="center">
                                    {params.map((p) => (
                                        <Td key={p.label}>{o[p.key]}</Td>
                                    ))}
                                    <Td>
                                        <HStack spacing="12px" justifyContent="end">
                                            {onEdit && (
                                                <Button variant="solid" colorScheme="teal" onClick={() => onEdit(o)}>
                                                    <FiEdit />
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="outline"
                                                    colorScheme="red"
                                                    onClick={() => setDeletedObject(o)}
                                                >
                                                    <FiTrash />
                                                </Button>
                                            )}
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    )}
                </Table>
                {onDelete && (
                    <Modal isOpen={!!deletedObject} onClose={() => setDeletedObject(undefined)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Object</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure you want to delete <b>{deletedObject?.[primaryKey]}</b>?
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={() => setDeletedObject(undefined)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="ghost"
                                    colorScheme="red"
                                    isLoading={isDeleting}
                                    onClick={async () => {
                                        if (deletedObject) {
                                            setIsDeleting(true);
                                            await onDelete(deletedObject);
                                            setDeletedObjects([...deletedObjects, deletedObject[primaryKey]]);
                                            setIsDeleting(false);
                                            setDeletedObject(undefined);
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </>
        );
    };
}
