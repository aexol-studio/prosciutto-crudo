import { Button, Flex, HStack, Select, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';

export function MultipleRelationField<
    ObjectType,
    PK extends keyof ObjectType,
    DK extends keyof ObjectType,
    T extends string,
>({
    objects,
    displayKey,
    primaryKey,
    name,
    plural,
    selectedObjects,
    setSelectedObjects,
}: {
    objects: ObjectType[];
    primaryKey: PK;
    displayKey: DK;
    name: string;
    plural?: string;
    selectedObjects: T[];
    setSelectedObjects: (objects: T[]) => void;
}) {
    const [selectedObject, setSelectedObject] = useState<T>();
    return (
        <VStack alignItems="stretch" alignSelf={'stretch'}>
            <Text size={'sm'}>{`Add ${name}`}</Text>
            <HStack>
                <Select
                    placeholder={`Select ${name}`}
                    value={selectedObject}
                    onChange={(e) => setSelectedObject(e.target.value as T)}
                >
                    {objects.map((scr) => (
                        <option key={scr[primaryKey] + ''} value={scr[primaryKey] as unknown as string | number}>
                            {scr[displayKey]}
                        </option>
                    ))}
                </Select>
                {selectedObject && (
                    <Button
                        colorScheme="green"
                        variant="outline"
                        onClick={() => setSelectedObjects([...selectedObjects, selectedObject])}
                    >
                        <FiPlus />
                    </Button>
                )}
            </HStack>
            {!!selectedObjects.length && <Text size={'sm'}>{`Added ${plural ?? `${name}s`}`}</Text>}
            <VStack alignItems="stretch">
                {selectedObjects.map((pk, i) => (
                    <Flex key={pk + i} alignItems="center">
                        <Text flex={1}>
                            {
                                objects.find(
                                    (s) => (s[primaryKey as keyof ObjectType] as unknown as typeof pk) === pk,
                                )?.[displayKey]
                            }
                        </Text>
                        <Button
                            onClick={() => setSelectedObjects(selectedObjects.filter((selected, index) => index !== i))}
                            colorScheme="red"
                            variant="outline"
                        >
                            <FiTrash />
                        </Button>
                    </Flex>
                ))}
            </VStack>
        </VStack>
    );
}
