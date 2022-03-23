import { GenericTable } from '@/generics';
export * from '@/components';
export * from './Provider';
export const ProsciuttoFactory = <GraphQLTypes>() => ({
    GenericTable: GenericTable<GraphQLTypes>(),
});
