import { gql } from 'apollo-server';

const CreateTransferFields = `
    amount: Float!
    conversionFee: Float
    originCurrency: Currency
    originEntityId: ID!
    originEntityType: EntityType!
    targetCurrency: Currency
    targetEntityId: ID!
    targetEntityType: EntityType!
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
