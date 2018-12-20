import {IMocks, IResolvers, ITypedef} from 'graphql-tools';
import gql from 'graphql-tag';

/**
 * Created by Evgeny Barabanov on 20/12/2018.
 */
export const allSchemas: ITypedef[] = [gql`
    type Query {
      dummy: String
    }
    type Mutation {
        dummy: String
    }
`];

export let allMocks: IMocks = {};
export let allResolvers: IResolvers<any, any> = {};

export interface GraphqlMockModule {
  schema: ITypedef;
  resolvers?: IResolvers<any, any>;
  mocks?: IMocks;
}

export function registerMockModule({schema, resolvers, mocks}: GraphqlMockModule) {
  allSchemas.push(schema);
  if (resolvers) {
    allResolvers = {...allResolvers, ...resolvers};
  }
  if (mocks) {
    allMocks = {...allMocks, ...mocks};
  }
}
