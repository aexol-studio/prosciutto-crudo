import { GenericTable } from '@/generics';
export * from '@/components';
export const ProsciuttoFactory = <GraphQLTypes>() => ({
    GenericTable: GenericTable<GraphQLTypes>(),
});
