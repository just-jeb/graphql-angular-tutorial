import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SchemaLink} from 'apollo-link-schema';
import gql from 'graphql-tag';
import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';

const mockSchema = gql`
  type Patient {
    id: ID!
    name: String
  }

  type Query {
    patient(id: ID!): Patient
  }
`;

const resolvers = {};

const mocks = {
  Patient: () => ({name: 'Donald Trump'})
};

const uri = ''; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  // Create a executable schema for all the modules that have registered in the mocking facility
  const schema = makeExecutableSchema({typeDefs: mockSchema, resolvers: resolvers});
  // This function call adds the mocks to your schema!
  addMockFunctionsToSchema({schema, mocks: mocks, preserveResolvers: true});
  return {
    link: new SchemaLink({schema}), // TODO: add conditional link (HttpLink for fullstack, SchemaLink when working with mocks)
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
