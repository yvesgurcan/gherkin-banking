import { gql } from 'apollo-server';

const CreateWalletFields = `
    companyId: ID!
    balance: Float
    currency: Currency
    isMaster: Boolean
`;

const WalletFields = `
    ${CreateWalletFields}
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

    type Wallet {
        ${WalletFields}
    }

    type Query {
        wallets: [Wallet]
    }

    type Mutation {
        createWallet(${CreateWalletFields}): Wallet
        addToWallet(amount: Float): Card
    }
`;
