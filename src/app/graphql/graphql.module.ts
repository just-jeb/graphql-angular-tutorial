import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SchemaLink} from 'apollo-link-schema';
import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';
import {allMocks, allResolvers, allSchemas} from './mock-registry';


const uri = ''; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  // Create a executable schema for all the modules that have registered in the mocking facility
  const schema = makeExecutableSchema({typeDefs: allSchemas, resolvers: allResolvers});
  // This function call adds the mocks to your schema!
  addMockFunctionsToSchema({schema, mocks: allMocks, preserveResolvers: true});
  return {
    link: new SchemaLink({schema}),
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
