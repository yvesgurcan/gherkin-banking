import { gql } from 'apollo-server';

const CreateCardFields = `
    walletId: ID!
    balance: Float
    currency: Currency
`;

const CardFields = `
    ${CreateCardFields}
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
        addToCard(amount: Float): Card
    }
`;
