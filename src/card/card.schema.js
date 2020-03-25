import { gql } from 'apollo-server';

const CreateCardFields = `
    walletId: ID!
    balance: Float
    currency: Currency
`;

export const CardFields = `
    ${CreateCardFields}
    walletId: ID
    id: ID
    userId: ID
    number: String
    expiration: String
    ccv: String
    isBlocked: Boolean
    createdAt: String
    updatedAt: String
`;

export default gql`
    type Card {
        ${CardFields}
    }

    type Query {
        cards: [Card]
        cardById(id: ID!): Card
    }

    type Mutation {
        createCard(${CreateCardFields}): Card
        updateCard(id: ID!, amount: Float!): Card
        blockCard(id: ID!): Card
        unblockCard(id: ID!): Card
    }
`;
