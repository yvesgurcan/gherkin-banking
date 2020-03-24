import { gql } from 'apollo-server';

const CreateTransferFields = `
    amount: Float!
    conversionFee: Float
    originCurrency: Currency
    originEntityId: ID!
    originEntityType: String!
    targetCurrency: Currency
    targetEntityId: ID!
    targetEntityType: String!
`;

const TransferFields = `
    ${CreateTransferFields}
    id: ID
    createdAt: String
    updatedAt: String
`;

export default gql`
    enum Currency {
        USD
        GBP
        EUR
    }

    type Transfer {
        ${TransferFields}
    }

    type Query {
        transfers: [Transfer]
    }

    type Mutation {
        createTransfer(${CreateTransferFields}): Transfer
    }
`;
