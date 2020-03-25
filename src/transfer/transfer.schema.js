import { gql } from 'apollo-server';

const CreateTransferFields = `
    amount: Float!
    conversionFee: Float
    originEntityId: ID!
    originEntityType: EntityType!
    targetEntityId: ID!
    targetEntityType: EntityType!
`;

const TransferFields = `
    ${CreateTransferFields}
    originCurrency: Currency
    targetCurrency: Currency
    id: ID
    createdAt: String
    updatedAt: String
`;

export default gql`
    enum EntityType {
        CARD
        WALLET
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
