import gql from 'graphql-tag';
import {MockList} from 'graphql-tools';
import {GraphqlMockModule} from '../graphql/mock-registry';

let counter = 0;

const patients = {'1': {name: 'Donald Trump', id: '1'}};

export const gqlMockModule: GraphqlMockModule = {
  schema: gql`
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

    extend type Query {
      patient(id: ID!): Patient
    }

    extend type Mutation {
      setPatientName(id: ID!, name: String!): Patient
    }
  `,
  resolvers: {
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
  },
  mocks: {
    LabTestResult: () => ({type: 'LabTestType' + counter, value: 'LabTestValue' + counter++})
  }
};
