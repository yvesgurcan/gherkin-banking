import { gql } from 'apollo-server';

const CardFields = `
    walletId: ID
    userId: ID
    balance: Float
    currency: Currency
    number: String
    expiration: String
    ccv: String
    isBlocked: Boolean

`;

export default gql`
    enum Currency {
        USD
        GBP
        EUR
    }

    type Card {
        id: ID
        createdAt: String
        updatedAt: String
        ${CardFields}
    }

    type Query {
        cards: [Card]
    }

    type Mutation {
        createCard(${CardFields}): Card
    }
`;
