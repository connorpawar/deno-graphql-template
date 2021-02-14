import { gql } from '../deps.ts';
import { UserResolvers, UserTypes } from "./user.ts";

export const resolvers = [ UserResolvers ];

export const Schema = (gql as any)`
    ${UserTypes}
`;