import { gql } from 'apollo-server';

const CreateCardFields = `
    walletId: ID!
    userId: ID!
    balance: Float
    currency: Currency
`;

const CardFields = `
    ${CreateCardFields}
    id: ID
    number: String
    expiration: String
    ccv: String
    isBlocked: Boolean
    createdAt: String
    updatedAt: String

`;

export default gql`
    enum Currency {
        USD
        GBP
        EUR
    }

    type Card {
        ${CardFields}
    }

    type Query {
        cards: [Card]
    }

    type Mutation {
        createCard(${CreateCardFields}): Card
    }
`;
