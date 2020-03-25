import { gql } from 'apollo-server';

const CreateWalletFields = `
    balance: Float
    currency: Currency
`;

export const WalletFields = `
    ${CreateWalletFields}
    id: ID
    companyId: ID
    isMaster: Boolean
    createdAt: String
    updatedAt: String
`;

export default gql`
    type Wallet {
        ${WalletFields}
    }

    type Query {
        wallets: [Wallet]
        walletById(id: ID!): Wallet
    }

    type Mutation {
        createWallet(${CreateWalletFields}): Wallet
        createMasterWallets: [Wallet]
        updateWallet(id: ID!, amount: Float!): Card
    }
`;
