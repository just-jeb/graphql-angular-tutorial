import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SchemaLink} from 'apollo-link-schema';
import gql from 'graphql-tag';
import {addMockFunctionsToSchema, makeExecutableSchema, MockList} from 'graphql-tools';

const mockSchema = gql`
  type LabTestResult {
    type: String
    value: String
    description: String
    id: ID
  }

  type Patient {
    id: ID!
    name: String
    address: String
    labTestResults(limit: Int!): [LabTestResult]
  }

  type Query {
    patient(id: ID!): Patient
  }

  type Mutation {
    setPatientName(id: ID!, name: String!): Patient
  }
`;

const patients = {'1': {name: 'Donald Trump', id: '1'}};

const resolvers = {
  Query: {
    patient: (source, {id}) => ({
      ...patients[id],
      labTestResults: (patient, {limit}) => new MockList(limit)
    })
  },
  Mutation: {
    setPatientName: (source, {id, name}) => {
      patients[id] = {id, name};
      return patients[id];
    }
  }
};

let counter = 0;

const mocks = {
  LabTestResult: () => ({type: 'LabTestType' + counter, value: 'LabTestValue' + counter++})
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
