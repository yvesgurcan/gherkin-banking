import { gql } from 'apollo-server';

const TransferFields = `
    amount: Float
    conversionFee: Float
    originCurrency: Currency
    originEntityId: ID
    originEntityType: String
    targetCurrency: Currency
    targetEntityId: ID
    targetEntityType: String

`;

export default gql`
    enum Currency {
        USD
        GBP
        EUR
    }

    type Transfer {
        id: ID
        createdAt: String
        updatedAt: String
        ${TransferFields}
    }

    type Query {
        transfers: [Transfer]
    }

    type Mutation {
        createTransfer(${TransferFields}): Transfer
    }
`;
